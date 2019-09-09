const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const Schema = mongoose.Schema;

const ProfilePictureSchema = new Schema({
    type:String,
    data:Buffer
})

module.exports = mongoose.model('ProfilePicture', ProfilePictureSchema);