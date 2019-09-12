const express = require('express');
const User = require ('../models/user');

/*
function userAuthentication(req,res,next){
    if(!req.session.userId){
        res.status(401).json({
            message:"User Unuthenticated"
        })
    }
    else{
        next();
    }
}
*/

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
    })
};

module.exports = {emailPasswordValidation};