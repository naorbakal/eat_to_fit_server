const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
// insert new User

router.post('/users',async (req,res,next)=>{
	//console.log(req.body);
	const nutritionist = await User.findById(req.body.nutritionistID).exec();
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

router.get('/users', async (req,res,next) =>{
	let clientsArr = new Array;
	if(req.query.nutritionistID){
	let nutritionist = await User.findById(req.query.nutritionistID).exec();

		nutritionist.clientsIDs.forEach(clientID => {
			client = User.find({_id : clientID}).select('_id profilePicture gender firstName lastName email').exec(function(err,result){
				let bool = false;
				result.hasNewMessage = bool;
				console.log(result);
				clientsArr.push({client : result, hasNewMessage: bool} );
				res.status(200).json({clients : clientsArr});
			});
		});
		
	}else{
		res.status(400).json({message: "Enter nutritionist id to get info"})
	}
});



module.exports = router;