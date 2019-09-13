const Meeting = require ('../../../models/meeting');
const User = require('../../../models/user');
const mongoose = require("mongoose");


async function saveMeeting(userId,meetingJson){
    let participent = await User.findById(userId).exec();
    const meeting = new Meeting(meetingJson);
    meeting.participant1 = {userID:participent._id,firstName:participent.firstName,lastName:participent.lastName};
	if(meetingJson.clientEmail){
        participent = await User.findOne({email:meetingJson.clientEmail}).exec();
        meeting.participant2 = {userID:participent._id,firstName:participent.firstName,lastName:participent.lastName};
    }   
    return await meeting.save()
}

 function setResponse(meeting){
    let participant2=null;

    if(meeting.participant2){
        participant2=meeting.participant2.firstName + ' ' + meeting.participant2.lastName
    }
    
    let response = {
        participant1:meeting.participant1.firstName +' ' +meeting.participant1.lastName,
        participant2:participant2,
        title: meeting.title,
        date:meeting.date,
        isAMeeting:meeting.isAMeeting
    };
    return response;
}

async function getUserMeetings(userId,year,month){
    let meetings = await Meeting.find({
       // $and:[
            $or:[{"participant1.userID":mongoose.Types.ObjectId(userId)},{"participant2.userID":mongoose.Types.ObjectId(userId)}]
            //{date:{$gte:new Date(year,month,1), $lte:new Date(year,month,31)}}
    }).exec();
    return meetings;  
}

module.exports={setResponse,saveMeeting,getUserMeetings};