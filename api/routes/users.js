const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
const Auth = require ('../auth');
// insert new User

router.get('/:id',(req,res,next)=>{
	User.findOne({_id: req.params.id})
	.then(response=>{
			res.status(200).json(response);
		})
});




module.exports = router;