const express=require('express');
const path=require('path');
var bodyParser = require('body-parser');
const session = require('express-sessions')
const expressValidator=require('express-validator');
const flash=require('connect-flash');

const mongoose=require('mongoose');

const { title } = require('process');
//init app
const app=express();
console.log("Hello World");

//connecting with the database - mongodb
mongoose.connect('mongodb://localhost/nodekb');
let db=mongoose.connection;

//check connection of database
db.once('open',function(){
    console.log('Cnnection established with the database');
});
db.on('error',function(err){
    console.log(err);
});


//setting the templates for app in views folder i.e. load view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');


let Article =require('./models/article');
//home route - view articles i.e. get
app.get('/', function(req,res){
    //res.send("Hello World");
    /* //Normal way
    let articles=[
        {
            id:1,
            title:'Article 1',
            author:'Kushal',
            body:'This is Article 1'
        },
        {
            id:2,
            title:'Article 2',
            author:'Aryan',
            body:'This is Article 2'
        }
    ];
    res.render('index',{
        title:'Hello World Kushal',
        description:'Kushal in Node world',
        articles:articles
    });*/

    //now from the database
    Article.find({},function(err,articles){
        if(err)
        {
            console.log("error from database: ",err );
        }
        else
        {
            res.render('index',{
                title:"Articles",
                articles:articles
            });
        }

    });

});


//middleware for using body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//adding router for articles
let articles=require('./routes/articles');
app.use('/articles',articles);


//adding router for users
let users=require('./routes/users');
app.use('/users',users);

/*
//Perform messages in expresss
//middleware for express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
//middleware for express-messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

*/
//server setup
app.listen(3000,function(){
    console.log("Server started at port 3000");
});