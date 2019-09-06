const express = require('express');
const User = require ('../models/user');

function userAuthentication(req,res,next){
    if(!req.session._id){
        res.status(401).json({
            message:"User Unuthenticated"
        })
    }
    else{
        next();
    }
}

//needs encription
function emailPasswordValidation(req,res,next){
    const user = await User.findOne({email:req.body.email,password:req.body.password}).exec()
    .then((user) =>{
        if(user!==null){
            req.userid = user._id;
            next();
        }
        else{
            res.status(401).json({
                message:"User Unuthenticated"
            })
        }
    }
);


}
module.exports = {userAuthentication,emailPasswordValidation};