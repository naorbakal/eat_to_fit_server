const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    authorID: Schema.Types.ObjectId, //nutritionist
    headline: String,
    content: String,
    image: {type: Schema.Types.ObjectId, default:null},
    creationDate: Date
});

const Posts = mongoose.model('Posts', PostSchema);

module.exports = Posts;

