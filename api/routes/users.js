const mongoose = require("mongoose");
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const User = require ('../../models/user');
const Image = require('../../models/image');
const ImageUtils = require ('./commons/imageUtils');


router.get('/',(req,res,next) => {
    User.find({}, function(err, users) {
        res.status(200).json(users);  
	  });
});

router.get('/:id/newMessage',async (req,res,next) => {
	let nutritionistID = null;
	const user = await User.findById(req.params.id).exec();
	
	if(!user.isNutritionist){
		nutritionistID = user.nutritionistID;
	}

	res.status(200).json({hasNewMessage : user.hasNewMessage, nutritionistID: nutritionistID});
})

module.exports = router;