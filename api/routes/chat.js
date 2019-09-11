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

    if(!isNutritionist){
        User.findById(clientID).then(client => {
            client.hasNewMessage = false;
            client.save();
        })
        User.findById(nutritionistID).then(nut => {
            receiverName = nut.firstName + " " + nut.lastName;
        })

    }
    else{
        User.findById(nutritionistID).then(nut => {
            nut.hasNewMessage = false;
            nut.clientsIDs.forEach(nutClient => {
                if(nutClient.hasNewMessage){
                    nut.hasNewMessage = true;
                    return;
                }
            })
        })
        nut.save();
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
    let user;
    msg.save().then(async result => {
        user = await User.findById(result.receiver).exec();
        if(user.isNutritionist){
            user.clientsIDs.forEach(nutClient => {
                if(nutClient === result.sender){
                    nutClient.hasNewMessage = true;
                    return;
                }                
            });
        }
        user.hasNewMessage = true;      
        user.save().then(result => {
            res.status(200).json({message : "message sent"});
        })
    })
})

module.exports = router;