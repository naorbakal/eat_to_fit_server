const mongoose = require("mongoose");
const express = require('express');
const multer = require('multer');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
const Auth = require ('../auth');
// insert new User


const storage = multer.diskStorage({
	destination: function (req,file,cb){
		cb(null,'./images');
	},
	filename: function (req,file,cb){
		cb(null, new Date().toISOString() + file.originalname);
	} 
});

const upload = multer({storage: storage});


router.get('/:id',(req,res,next)=>{
	User.findOne({_id: req.params.id})
	.then(response=>{
			res.status(200).json(response);
		})
});

router.post('/images',upload.single('profilePicture'),(req,res,naxt)=>{
	res.sendStatus(200);
});

module.exports = router;