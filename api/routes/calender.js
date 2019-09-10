const mongoose = require("mongoose");
const express = require('express');


const Calender = require ('../../models/calender');
const User = require('../models/user');
router.post('/',(req, res, next) => {
    const calender = new Calender(req.body);
    calender.nutritionistID = req.query.nutritionistID;
});

router.get('/', async (req, res, next) => {
    // need to check what calender
    let user = await User.findById(req,query.userID).exec();
    if(user.isNutritionist){
        
    }
})

module.exports = router;