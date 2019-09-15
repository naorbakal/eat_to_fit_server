const mongoose = require("mongoose");
const express = require('express');
const ImageUtils = require('./commons/imageUtils');
const router = express.Router();

const Post = require('../../models/post');

router.post('/',async(req,res,next)=>{
    try{
        let post = new Post({
            authorID: req.body.authorID,
            headline: req.body.headline,
            content:  req.body.content,
            creationDate: new Date()
        });
        if(req.body.imageUrl){
            const image =await ImageUtils.saveImage(req.body.imageUrl);
            console.log(image.url);
            post.imageUrl=image.url;
        }
        post.save()
        .then((result)=>{
            res.sendStatus(201);
        })
    }
    catch(err){
        res.status(500).json({
            message:err
        });
    }
});

router.get('/',async(req,res,next)=>{
    const pageSize=10;
    const offset = req.query.offset;
    const from = (offset-1)*pageSize;
    const nutId = req.query.nutritionistID;
    let posts = new Array();
    try{
        let postsfromDb = await Post.find({authorID:nutId}).sort({creationDate:-1}).limit(offset*pageSize).exec();
        const to = offset*pageSize < postsfromDb.length ? offset*pageSize:postsfromDb.length;
        for (let i=from;i<to;i++){
            posts.push(postsfromDb[i]);
        }  
        res.status(200).json({
            posts
        });
    }
    catch(err){
        res.status(500).json({
            message:err
        });
    }  
})

router.delete('/:id/', async (req,res,next) => {
    Post.remove({_id : req.params.id}, function(err) {
        if(!err){
            res.status(200).json({message : "Post removed"});
        }else{
            res.status(500).json({error : err});
        }
    })
})

module.exports = router;
