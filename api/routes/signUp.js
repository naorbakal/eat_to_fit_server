const mongoose = require("mongoose");
const express = require('express');
const commons = require('./commons/registrationUtils');
const router = express.Router();

const User = require ('../../models/user');
const ImageUtils = require('./commons/imageUtils');
// handles registration
router.post('/', async (req, res, next) => {

    User.findOne({email : req.body.email}, async (err,result) =>{

        if(err){
            //handle error
        }
        if(result){
            res.status(409).json({
                message: req.body.email + "already exists"
            })
        }
        else{
            let user = new User(req.body);
            if(req.body.image){
                const image =await ImageUtils.saveImage(req.body.image);
                user.profilePicture=image._id;
            }
            user
                .save()
                .then(async result => {
                    user = await commons.setUserLoginSignUpResponse(result);
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