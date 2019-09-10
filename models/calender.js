const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;

const CalenderSchema = new Schema({
    name: String,
    date: Date,
    nutritionistID: Schema.Types.ObjectId,
    clientID: Schema.Types.ObjectId,
    isAmeeting: Boolean
});

const Calender = mongoose.model('Calender', CalenderSchema);

module.exports = Calender;