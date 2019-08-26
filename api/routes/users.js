const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
const Auth = require ('../auth');
// insert new User
router.post('/',(req, res, next) => {
	const user = new User(req.body);
	req.session._id= user.email;
	try{
		user.save()
		.then(result => {
			res.status(201).json({
				message: "Handle Post req to /users",
				createdUser: result
			})
		});
	}
	catch(err){
		console.log(err.message);
	}
	
});

router.get('/',Auth.userAuthentication,(req,res,next)=>{
		User.findOne({email : req.session._id})
		.then(response=>{
			res.status(200).json(response);
		})
});


module.exports = router;