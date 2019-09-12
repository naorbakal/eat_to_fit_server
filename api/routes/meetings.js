const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const meetingUtils = require('./commons/meetingsUtils');

router.post('/:userID',async (req, res, next) => {
    let meeting = await meetingUtils.saveMeeting(req.params.userID,req.body);
    const user = await User.findById(req.params.userID);
	const response = await meetingUtils.setResponse(user.isNutritionist,meeting);
    res.status(201).json({
		meeting:response	
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