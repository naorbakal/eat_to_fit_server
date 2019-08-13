const express = require('express');
const auth = require('./auth');

const userManagement = express.Router();

userManagement.get('/', auth.userAuthentication, (req, res) => {
	const userinfo = auth.getUserInfo(req.session.id);
	res.json(userinfo);
});

userManagement.post('/addUser', auth.addUser, (req, res) => {		
	res.sendStatus(200);	
});

module.exports = userManagement;