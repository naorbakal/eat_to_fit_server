const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');

// insert new User
router.post('/', (req, res, next) => {
	const user = new User(req.body);
	user
		.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: "Handle Post req to /users",
				createdUser: result
			})
		});
	});

module.exports = router;