const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const meetingUtils = require('./commons/meetingsUtils');

router.post('/:userID',async (req, res, next) => {
    try{
        let meeting = await meetingUtils.saveMeeting(req.params.userID,req.body);
        const response = await meetingUtils.setResponse(meeting);
        res.status(201).json({
            meeting:response	
        });
    }
    catch(err){
        res.status(500).json({
            message:err
        });
    }
});

router.get('/:userID', async (req, res, next) => {
    let userMeetings= await meetingUtils.getUserMeetings(req.params.userID,req.body.year,req.body.month);
    const meetingsResponse = userMeetings.map(meeting =>{
         return meetingUtils.setResponse(meeting)
    }); 
     res.status(200).json({
         meetings:meetingsResponse
    })
})

module.exports = router;