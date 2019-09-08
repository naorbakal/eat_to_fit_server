const mongoose = require("mongoose");
const express = require('express');
const commons = require('./commons/registrationUtils');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
const Auth = require ('../auth');
//handles login
router.post('/',Auth.emailPasswordValidation,(req, res, next) => {
    user = commons.setUserLoginSignUpResponse(req.user);
    res.status(200).json({
        message: "Handle SignUp req to /signUp",
        user
    })
});

module.exports = router;