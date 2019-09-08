const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
// insert new User

router.post('/users',async (req,res,next)=>{
	const nutritionist = await User.findById(req.body.nutritionistID).exec();
		
	if(req.body.clientEmail){
	User.findOne({email: req.query.email})
	.then(client=>{
			client.nutritionistID = nutritionist;
			nutritionist.clientsIDs.push(client._id);
			client.save();
			nutritionist.save();

		})
	}
	else {
			res.status(200).json(nutritionist.clientsIDs);		
	  }
});




module.exports = router;