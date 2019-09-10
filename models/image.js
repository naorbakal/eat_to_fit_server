const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    type:String,
    data:Buffer,
    url:String
})

module.exports = mongoose.model('Image', ImageSchema);