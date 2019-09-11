const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
// insert new User

router.post('/:nutritionistID/users',async (req,res,next)=>{
	//console.log(req.body);
	const nutritionist = await User.findById(req.params.nutritionistID).exec();
	//console.log(nutritionist);
	if(req.body.clientEmail){
	User.findOne({email: req.body.clientEmail})
	.then(client=>{
			if(client === null){
				res.status(404).json({
					message:'Client with the email' + req.body.clientEmail +' doesnt exist'
				});
			}
			else if(client.nutritionistID === nutritionist_id){
				res.sendStatus(200);
			}
			else if(client.nutritionistID !== null || client.nutritionistID !==undefined ){
				res.status(400).json({
					message:client.firstName+' ' + client.lastName +' is allready assigned to a different nutritionist'
				});
			}
			else{
			client.nutritionistID = nutritionist;
			nutritionist.clientsIDs.push(client._id);
			client.save()
			.then(()=>{
				nutritionist.save().
					then(()=>{
					res.status(200).json({message: "Client added"});
					})
					.catch(err=>{
						res.status(500).json({
							message: "Problem with assigning nutritionist to client "
						})
					})
			})
			.catch(err=>{
				res.status(500).json({
					message: "Problem with assigning client to nutritionist"
				})
			})
		}
	});	
}
	else { // error
			//res.status(200).json(nutritionist.clientsIDs);		
	  }
});

router.get('/:nutritionistID/users', async (req,res,next) =>{
	let clients = new Array;
	if(req.params.nutritionistID){
	let nutritionist = await User.findById(req.params.nutritionistID).exec();

		 await Promise.all(nutritionist.clientsIDs.map(async clientID=>{
			const result = await User.find({_id : clientID}).select('_id profilePicture gender firstName lastName email').exec()
			clients.push({client : result});
	}));
	res.status(200).json({clients});
}
	else{
		res.status(400).json({message: "Enter nutritionist id to get info"})
	}
});

router.get('/:nutritionistID/users/:clientID',async (req,res,next)=>{
	const client = await User.findById(req.params.clientID).select('_id profilePicture gender firstName lastName email').exec();
	if(client === null){
		res.status(404).json({
			message: 'A user with the id: '+req.params.clientID+ ' doesnt exists'
		});
	}
	else if(req.params.nutritionistID !== client.nutritionistID.toString()){
		res.status(403).json({
			message:'The user with id: ' + req.params.clientID + ' is not a client of ' + req.params.nutritionistID
		});
	}
	else{
		res.status(200).json({
			client
		})
	}
})

module.exports = router;