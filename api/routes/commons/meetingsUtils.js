const Meeting = require ('../../../models/meeting');
const User = require('../../../models/user');
const mongoose = require("mongoose");


async function saveMeeting(userId,meetingJson){
    let participent = await User.findById(userId).exec();
    const meeting = new Meeting(meetingJson);
    meeting.firstParticipent = {userID:participent._id,firstName:participent.firstName,lastName:participent.lastName};
	if(meetingJson.clientEmail){
        participent = await User.findOne({email:meetingJson.clientEmail}).exec();
        meeting.secondParticipent = {userID:participent._id,firstName:participent.firstName,lastName:participent.lastName};
    }   
    return await meeting.save()
}

 function setResponse(meeting){
    let secondParticipent=null;

    if(meeting.secondParticipent){
        secondParticipent=meeting.secondParticipent.firstName + ' ' + meeting.secondParticipent.lastName
    }
    
    let response = {
        firstParticipent:meeting.firstParticipent.firstName +' ' +meeting.firstParticipent.lastName,
        secondParticipent:secondParticipent,
        title: meeting.title,
        date:meeting.date,
        isAmeeting:meeting.isAmeeting
    };
    return response;
}

async function getUserMeetings(userId,year,month){
    let meetings = await Meeting.find({
       // $and:[
            $or:[{"firstParticipent.userID":mongoose.Types.ObjectId(userId)},{"secondParticipent.userID":mongoose.Types.ObjectId(userId)}]
            //{date:{$gte:new Date(year,month,1), $lte:new Date(year,month,31)}}
    }).exec();
    return meetings;  
}

module.exports={setResponse,saveMeeting,getUserMeetings};