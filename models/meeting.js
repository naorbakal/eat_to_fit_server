const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
    title: String,
    date: Date,
    nutritionistID: Schema.Types.ObjectId,
    clientID: Schema.Types.ObjectId,
    isAmeeting: Boolean
});

const calendar = mongoose.model('meetings', MeetingSchema);

module.exports = calendar;