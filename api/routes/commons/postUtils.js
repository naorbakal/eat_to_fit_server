var expess = require("express");
var fs = require("fs");

const Image = require('../../../models/image');

async function adjustPostRespone(post){
    let image;
    if(post.image){
        image = await Image.findById(post.image);
    }

    return({
        authorID: post.authorID,
        headline: post.headline,
        content: post.content,
        image: image.content,
        creationDate: post.creationDate
    })
}

module.exports={adjustPostRespone};