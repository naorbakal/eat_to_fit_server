const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;

const CalendarSchema = new Schema({
    name: String,
    date: Date,
    nutritionistID: Schema.Types.ObjectId,
    clientID: Schema.Types.ObjectId,
    isAmeeting: Boolean
});

const calendar = mongoose.model('calendar', CalendarSchema);

module.exports = calendar;