const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    nutritionistID: Schema.Types.ObjectId,
    clientID :  Schema.Types.ObjectId,
});

module.exports = mongoose.model('Chat', ChatSchema);