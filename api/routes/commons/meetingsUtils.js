const Meeting = require ('../../../models/meeting');
const User = require('../../../models/user');

async function saveMeeting(nutritionistID,meetingJson){
    const meeting = new Meeting(meetingJson);
	meeting.nutritionistID = nutritionistID;
	if(meetingJson.clientEmail){
		meeting.clientID = await User.findOne({email:meetingJson.clientEmail}).exec();
    }   
    return await meeting.save()
}

async function setResponse(isNutritionist,meeting){
    let user=null;
    let secondParticipent=null;
    if(isNutritionist){
        if(meeting.clientID){
            user = await User.findById(meeting.clientID).exec();
        }
    }
    else{
        if(meeting.nutritionistID){
            user = await User.findById(meeting.nutritionistID).exec();
        }
    }
    if(user!==null){
        secondParticipent={
            firstName: user.firstName,
            lastName: user.lastName,
        }
    }
    let response = {
        secondParticipent:secondParticipent,
        title: meeting.title,
        date:meeting.date,
        isAmeeting:meeting.isAmeeting
    };
    return response;
}

module.exports={setResponse,saveMeeting};