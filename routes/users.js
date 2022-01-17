const express=require('express');
const bcrypt=require('bcryptjs');
const router=express.Router();

//Bringing User model
let User =require('../models/user');

//Registration form - /users/require
router.get('/register',function(req,res){
    res.render("register",{
        title:'User Registration'
    });
});

router.post('/register',function(req,res){

    const name =req.body.name;
    const email=req.body.email;
    const username=req.body.username;
    const password = req.body.password;
    const password2=req.body.password2;

    if(password===password2)
    {
        let newuser= new User({
            name:name,
            email:email,
            username:username,
            password:password

        });

        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(newuser.password,salt,function(err,hash){

                if(err)
                {
                    console.log(err);
                    ///return;
                }
                else
                {
                    newuser.password=hash;
                    newuser.save(function(err){
                        if(err)
                        {
                            console.log(err);
                            return;
                        }
                        else{
                            //req.flash("Success, user has been registered");
        
                            res.redirect('/users/login');
                        }

                    });
                }
                
            });
        });
    }
    else{
        res.render('register');
    }
});


router.get('/login',function(req,res){

    res.render('login');
});
module.exports=router;