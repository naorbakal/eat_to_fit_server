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
router.get('/',(req,res,next) => {
    User.find({}, function(err, users) {
        //var productMap = {};
    
        //products.forEach(function(product) {
          //productMap[product._id] = product;
        //});
    
        res.status(200).json(users);  
	  });
});

router.post('/:id/images',ImageUtils.getUploadObj().single('image'),async(req,res,naxt)=>{
	const image = await saveImageFileInDB(file);
	User.findById(req.params.id).
	then((user)=>{
		user.profilePicture = result._id;
		user.save();
		res.status(201).json({
			url:image.url
		});
	})
	.catch(err =>{
		res.sendStatus(500);
	});
})

router.get('/images',async (req,res,next) =>{
	let image = await ImageUtils.getUserImage(req.query.userId);
	res.status(200).json({
		url:image.url
	})
});

module.exports = router;