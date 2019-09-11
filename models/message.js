const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    sender: {type:Schema.Types.ObjectId,required:true},
    receiver:{type:Schema.Types.ObjectId,required:true},
    date: {type: Date, required: true},
    content: {type: String, required: true},
    chatID: {type:Schema.Types.ObjectId,required:true}
});

module.exports = mongoose.model('Message', MessageSchema);


