const express=require('express');
const path=require('path');
var bodyParser = require('body-parser');
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


//new Route - /articles/add/
app.get('/articles/add',function(req,res){
    
    res.render('add',{
        title:'Add Articles'
    });
});

//middleware for using body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//add POST requiest for submit btn
app.post('/articles/add',function(req,res){
    let article=new Article();
    article.id=req.body.id;
    article.title=req.body.title;
    article.author=req.body.author;
    article.body=req.body.body;

    article.save(function(err){
        if(err)
        {
            console.log(err);
            return;
        }
        else{
            console.log("Data submitted to database");
            res.redirect('/');
        }
    });

    return;
});

//get single article

app.get('/articles/:id',function(req,res){
    Article.findById(req.params.id,function(err,article){
        //console.log(article);
        res.render('article',{
            title:'Single Article',
            article:article
        });
    });
});

//edit update article
app.get('/articles/edit/:id',function(req,res){
    Article.findById(req.params.id,function(err,article){
        //console.log(article);
        res.render('edit_article',{
            title:'Single Article Edit',
            article:article
        });
    });
});

app.post('/articles/edit/:id',function(req,res){
    let article={};
    article.id=req.body.id;
    article.title=req.body.title;
    article.author=req.body.author;
    article.body=req.body.body;

    let query={_id:req.params.id};
    Article.updateOne(query,article,function(err){
        if(err)
        {
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    });

});
//deleting the article
app.delete('/article/delete/:id',function(req,res){
    let query={_id:req.params.id};
    Article.remove(query,function(err){
        if(err)
        {
            console.log(err);
        }
        else{
            res.send('Success');
        }
    });
});

//server setup
app.listen(3000,function(){
    console.log("Server started at port 3000");
});