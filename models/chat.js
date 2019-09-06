const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    messagesIDs: Array
});

module.exports = mongoose.model('Chat', ChatSchema);