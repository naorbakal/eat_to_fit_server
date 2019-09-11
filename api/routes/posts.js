const mongoose = require("mongoose");
const express = require('express');
const ImageUtils = require('./commons/imageUtils');
const router = express.Router();

const Post = require('../../models/post');


router.post('/',ImageUtils.getUploadObj().single('image'),async(req,res,next)=>{

    let post = new Post({
        authorID: req.body.authorID,
        headline: req.body.headline,
        content:  req.body.content,
        creationDate: new Date()
    });
    if(req.file !== undefined){
        const image = await ImageUtils.saveImageFileInDB(req.file);
        post.image = image._id;
    }
    post.save()
    .then((result)=>{
        res.sendStatus(201);
    })
});

router.get('/',async(req,res,next)=>{
    const pageSize=10;
    const offset = req.query.offset;
    const from = (offset-1)*pageSizeze;
    const nutId = req.query.nutritionistId;
    let posts = new Array();

    let postsfromDb = await Post.find({authorID:nutId}).sort({creationDate:-1}).limit(offset*pageSizeze).exec();
    const to = offset*pageSizeze < postsfromDb.length ? offset*pageSizeze:postsfromDb.length;
    console.log(to);
    for (let i=from;i<to;i++){
        posts.push(postsfromDb[i]);
    }  
    res.status(200).json({
         posts
    });  
})

module.exports = router;
