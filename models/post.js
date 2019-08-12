const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    authorID: [Schema.Types.ObjectId], //nutritionist
    title: String,
    content: String,
    brief: String,
    pictureUrl: String,
    date: Date
});

const Posts = mongoose.model('Posts', PostSchema);

module.exports = Posts;