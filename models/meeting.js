const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
    title: String,
    date: Date,
    participant1: {type:Object,default:{userID:null,firstName:null,lastName:null}},
    participant2: {type:Object,default:{userID:null,firstName:null,lastName:null}},
    isAMeeting: Boolean
});

const calendar = mongoose.model('meetings', MeetingSchema);

module.exports = calendar;