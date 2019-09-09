const mongoose = require("mongoose");
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
const ProfilePicture = require('../../models/profilePicture');
const Auth = require ('../auth');
// insert new User

const fileFilter = (req,file,cb) =>{
	if(file.mimetype=== 'image/png' || file.mimetype=== 'image/jpeg'){
		cb(null,true);
	}
	else{
		cb(null,false);
	}
}

const storage = multer.diskStorage({
	destination:function (req,file,cb){
		cb(null,'./images/');
	},
	filename: function (req,file,cb){
		cb(null, req.body.userId + path.extname(file.originalname));
	} 
});

const upload = multer({
	storage: storage,
	fileFilter:fileFilter
});
/*
const upload = multer({dest: './images/'});
*/

router.get('/:id',(req,res,next)=>{
	User.findOne({_id: req.params.id})
	.then(response=>{
			res.status(200).json(response);
		})
});

router.post('/images',upload.single('image'),(req,res,naxt)=>{
	const imageData = fs.readFileSync(req.file.path);
	const profilePicture = new ProfilePicture({
		type: req.file.mimetype,
		data:imageData
	})
	profilePicture.save()
	.then(()=>{
		res.sendStatus(201);
	})
	.catch(err =>{
		res.sendStatus(500);
	})
});

module.exports = router;