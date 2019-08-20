const express = require('express');

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
module.exports = {userAuthentication};