const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
const Meeting = require ('../../models/meeting');
const User = require('../../models/user');

router.post('/',(req, res, next) => {
    const meeting = new Meeting(req.body);
    metting.nutritionistID = req.query.id;
    calendar.save().then(result => {
        res.status(201).json({
            messege : "Event added",
            event: calendar
        });
    });
});

router.get('/', async (req, res, next) => {
    var calendarMap = new Map();
    let user = await User.findById(req.query.id).exec();
    //console.log(user);
    if(user.isNutritionist){
        items = await Calendar.find({nutritionistID : user._id}).exec();
    
    }
    else{
        items = await Calendar.find({clientID : user._id}).exec();
    }

    res.status(200).json(items);

    /*
    items.forEach(element => {
        calendarMap.set(element.date, 
                        {name : element.name, isAmeeting : element.isAmeeting});
        });
        console.log(calendarMap);
        res.status(200).json({
        data : calendarMap
        })
    */
})

module.exports = router;