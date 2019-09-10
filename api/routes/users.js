const mongoose = require("mongoose");
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
const Image = require('../../models/image');
const ImageUtils = require ('./commons/imageUtils');

// insert new User

/*
router.get('/:id',(req,res,next)=>{
	User.findOne({_id: req.params.id})
	.then(response=>{
			res.status(200).json(response);
		})
});
*/
router.post('/images',ImageUtils.getUploadObj().single('image'),(req,res,naxt)=>{
	const imageData = fs.readFileSync(req.file.path);
	const imageUrl = ImageUtils.adjustImageUrl(req.file.path);
	const image = new Image({
		type: req.file.mimetype,
		data:imageData,
		url:imageUrl
	});
	image.save()
	.then((result)=>{
		User.findById(req.body.userId).
		then((user)=>{
			user.profilePicture = result._id;
			user.save();
			res.status(201).json({
				url:result.url
			});
		});
	})
	.catch(err =>{
		res.sendStatus(500);
	})
});

router.get('/images',async (req,res,next) =>{
	let image = await ImageUtils.getUserImage(req.query.userId);
	res.status(200).json({
		url:image.url
	})
});


module.exports = router;