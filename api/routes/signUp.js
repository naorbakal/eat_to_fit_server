const mongoose = require("mongoose");
const express = require('express');
const commons = require('./commons/commons');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
const Auth = require ('../auth');
// handles registration
router.post('/',(req, res, next) => {

    User.findOne({email : req.body.email}, (err,result) =>{

        if(err){
            //handle error
        }
        if(result){
            res.status(409).json({
                message: req.body.email + "already exists"
            })
        }
        else{
            const user = new User(req.body);
            user
                .save()
                .then(result => {
                    user = commons.setUserLoginSignUpResponse();
                    res.status(201).json({
                        message: "Handle SignUp req to /signUp",
                        user
                    })
                })
                .catch(err=>{
                    res.status(422).json({
                        message: err.message
                    })
                });


        }
    });
});

module.exports = router;