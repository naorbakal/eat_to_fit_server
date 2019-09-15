const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
const Menu = require ('../../models/menu');
const RegistrationUtils = require('./commons/registrationUtils');


// insert new User

router.post('/:nutritionistID/users',async (req,res,next)=>{
	try{
		const nutritionist = await User.findById(req.params.nutritionistID).exec();	
		if(req.body.clientEmail){
		User.findOne({email: req.body.clientEmail})
		.then(client=>{
				if(client === null || client === undefined){
					res.status(404).json({
						message:'Client with the email' + req.body.clientEmail +' doesnt exist'
					});
				}
				else if(client.nutritionistID === nutritionist._id){
					res.sendStatus(200);
				}
				else if(client.nutritionistID !== null && client.nutritionistID !==undefined ){
					res.status(400).json({
						message:client.firstName+' ' + client.lastName +' is allready assigned to a different nutritionist'
					});
				}
				else{
				client.nutritionistID = nutritionist._id;
				nutritionist.clientsIDs.push({clientID : client._id , hasNewMessage : false});
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
		else { 
			res.status(400).json({message : "problem with Client Email"});		
		}
	}
	catch(err){
        res.status(500).json({
            message:err
        });
    }
});

router.get('/:nutritionistID/users', async (req,res,next) =>{

	try{
		let clients = new Array;
		let hasNewMessage;
		if(req.params.nutritionistID){
		let nutritionist = await User.findById(req.params.nutritionistID).exec();
	
			 await Promise.all(nutritionist.clientsIDs.map(async clientID=>{
				const result = await User.findById(clientID.clientID).select('_id profilePicture gender firstName lastName email hasNewMessage').exec();
				nutritionist.clientsIDs.forEach(nutClient => {
					if(nutClient.clientID === clientID.clientID){
						hasNewMessage = nutClient.hasNewMessage;
					}
				});
				
				clients.push(await RegistrationUtils.setUserLoginSignUpResponse(result));
				/*
				clients.push({
					_id:result._id,
					profilePicture: result.profilePicture.content,
					gender: result.gender,
					firstName:result.firstName,
					lastName:result.lastName,
					email:result.email,
					hasNewMessage: hasNewMessage
				});
				*/
		}));
		res.status(200).json({clients});
	}
		else{
			res.status(400).json({message: "Enter nutritionist id to get info"})
		}
	}
	catch(err){
        res.status(500).json({
            message:err
        });
    }
});

router.get('/:nutritionistID/users/:clientID',async (req,res,next)=>{
	try{
		const client = await User.findById(req.params.clientID).select('_id nutritionistID profilePicture gender firstName lastName email').exec();
		if(client === null ){
			res.status(404).json({
				message: 'A user with the id: '+req.params.clientID+ ' doesnt exists'
			});
		}
		else if(client.nutritionistID===undefined || (req.params.nutritionistID !== client.nutritionistID.toString())){
			res.status(403).json({
				message:'The user with id: ' + req.params.clientID + ' is not a client of ' + req.params.nutritionistID
			});
		}
		else{
			res.status(200).json({client});
		}
	}
	catch(e){
		res.sendStatus(500);
	}

})

//menus
router.get('/:nutritionistId/menus',async(req,res,next)=>{
	try{
		const menus = await Menu.find({author:req.params.nutritionistId}).sort({date: -1}).select('_id name').exec();
		if(menus === null){
			res.sendStatus(404);
		}
		else{
			res.status(200).json({menus});
		}
	}
	catch(err){
        res.status(500).json({
            message:err
        });
    }
})

//


module.exports = router;