const mongoose = require('mongoose');
let user = require('../models/user');


function userAuthentication(req, res, next) {
	mongoose.connect('mongodb://localhost/eat_to_fit', { useNewUrlParser: true });
	let db = mongoose.connection;
	let myUser = user.findOne({sessionid : req.session.id});
	if(myUser === null){
		res.sendStatus(401);
	}else{
		next();
	}
}

function getUserInfo(sessionid){
	let myUser = user.findOne({sessionid : sessionid});
	db.close();
	return JSON.stringify(myUser);
}

function addUser(req, res, next) {
	mongoose.connect('mongodb://localhost/eat_to_fit', { useNewUrlParser: true });
	let db = mongoose.connection;
	const newUser = new user(JSON.parse(req.body));
	newUser.save();
	db.close();
	next();
}

module.exports = {userAuthentication, getUserInfo, addUser};