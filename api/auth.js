const express = require('express');
const User = require ('../models/user');

function emailPasswordValidation(req,res,next){
    User.findOne({email:req.body.email,password:req.body.password}).exec()
    .then((user) =>{
        if(user!==null){
            req.user=user;
            next();
        }
        else{
            res.status(401).json({
                message:"User Unuthenticated"
            })
        }
    }).    
    catch(err=>{
        res.status(500).json({
            message:err
        });
    });   
};

module.exports = {emailPasswordValidation};