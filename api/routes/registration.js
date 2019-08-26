const mongoose = require("mongoose");
const express = require('express');
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
            req.session._id= user.email;
                user 
                .save()
                .then(result => {
                    res.status(201).json({
                        message: "Handle registration req to /registration",
                        createdUser: result
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