const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
const Auth = require ('../auth');
//handles login
router.post('/',Auth.emailPasswordValidation,(req, res, next) => {
    req.session._id= req.body.email;
    res.sendStatus(200);
});

module.exports = router;