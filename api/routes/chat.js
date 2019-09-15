const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();

const Chat = require ('../../models/chat');
const Message = require('../../models/message')
const User = require('../../models/user');

router.get('/',async (req, res, next) => {
    let nutritionistID = req.query.nutritionistID;
    const clientID = req.query.clientID;
    const offset = req.query.offset;
    const isNutritionist = req.query.isNutritionist;
    const chatSize = 100;
    let messages;
    let chat;
    let receiverName;
    let clientsArr;

    if(!isNutritionist){
        console.log(clientID);
        User.findById(clientID).then( async client => {
            console.log(client);
            client.hasNewMessage = false;
            await client.save();
        })
        User.findById(nutritionistID).then(nut => {
            receiverName = nut.firstName + " " + nut.lastName;
        })
    }
    else{
        User.findById(nutritionistID).then(async nut => {
            nut.hasNewMessage = false;
            clientsArr = nut.clientsIDs.map(nutClient => {
                if((nutClient.clientID).toString() !== clientID.toString() && nutClient.hasNewMessage === true ){
                    nutClient.hasNewMessage = true;
                    nut.hasNewMessage = true;
                }
                else if((nutClient.clientID).toString() === clientID.toString()){
                    nutClient.hasNewMessage = false;
                }
                return nutClient;
            })
            nut.clientsIDs = clientsArr;
            nut.markModified('clientsIDs');
            await nut.save();
        })
        User.findById(clientID).then(client => {
            receiverName = client.firstName + " " + client.lastName;
        })
    }
    let skip = (offset - 1)*chatSize;
    let limit = offset * chatSize;

    chat = await Chat.findOne({nutritionistID : nutritionistID, clientID : clientID}).exec();
    if(!chat){
        chat = new Chat({nutritionistID: nutritionistID, clientID: clientID});
        await chat.save();
    }
    messages = await Message.find({chatID : chat._id}).sort({date: -1}).skip(skip).limit(limit).exec();

    res.status(200).json({chatID: chat._id, messages: messages, receiverName: receiverName});
    // update has new message
    
});

router.post('/',async (req, res, next) => {
    let msg = new Message(req.body);
    msg.date = new Date();
    let clientsArr;
    let user;
    msg.save().then(async result => {
        user = await User.findById(result.receiver).exec();
        if(user.isNutritionist){
            clientsArr = user.clientsIDs.map(nutClient => {           
                if((nutClient.clientID).toString() === (result.sender).toString()){
                    nutClient.hasNewMessage = true;
                }
                    return nutClient;             
            });
        }
        user.clientsIDs = clientsArr;
        user.hasNewMessage = true;  
        user.markModified('clientsIDs');
        user.save().then(result => {
            res.status(200).json({message : "message sent"});
        })
    })
})

module.exports = router;