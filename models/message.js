const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    sender: {type:Schema.Types.ObjectId,required:true},
    receiver:{type:Schema.Types.ObjectId,required:true},
    Date: {type: Date, required: true},
    content: {type: String, required: true}
});

module.exports = mongoose.model('Message', MessageSchema);


