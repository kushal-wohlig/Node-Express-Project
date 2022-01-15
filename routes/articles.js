const express=require('express');
const router=express.Router();
let Article =require('../models/article');

//new Route - /articles/add/
router.get('/add',function(req,res){
    
    res.render('add',{
        title:'Add Articles'
    });
});

//add POST requiest for submit btn
router.post('/add',function(req,res){
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

router.get('/:id',function(req,res){
    Article.findById(req.params.id,function(err,article){
        //console.log(article);
        res.render('article',{
            title:'Single Article',
            article:article
        });
    });
});


//edit update article
router.get('/edit/:id',function(req,res){
    Article.findById(req.params.id,function(err,article){
        //console.log(article);
        res.render('edit_article',{
            title:'Single Article Edit',
            article:article
        });
    });
});

router.post('/edit/:id',function(req,res){
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
router.delete('/delete/:id',function(req,res){
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


module.exports=router;