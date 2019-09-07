const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
const Auth = require ('../auth');
//handles login
router.post('/',Auth.emailPasswordValidation,(req, res, next) => {
    req.session.userId= req.userId;
    console.log(req.sessionID);
    res.sendStatus(200);
});

module.exports = router;