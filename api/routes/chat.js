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
    const chatSize = 10;
    var messages;
    let chat;

    if(!nutritionistID){
        User.findById(clientID).then(client => {
            client.hasNewMessage = false;
            client.save();
        })
        const client = await User.findById(clientID).exec();
        nutritionistID = client.nutritionistID;
    }
    else{
        User.findById(nutritionistID).then(nut => {
            nut.hasNewMessage = false;
            nut.save();
        })
    }

    let skip = (offset - 1)*chatSize;
    let limit = offset * chatSize;
    /*
    if(!nutritionistID){
        messagesIDs = await Chat.find({clientID : clientID}).sort({date: -1}).skip(skip).limit(limit).exec();
        if(offset == 1){
            User.findById(clientID).then(client => {
                client.hasNewMessage = false;
                client.save();
            })
        }
    }else{
        */
    chat = await Chat.findOne({nutritionistID : nutritionistID, clientID : clientID}).exec();
    if(!chat){
        chat = new Chat({nutritionistID: nutritionistID, clientID: clientID});
        await chat.save();
    }
    messages = await Message.find({chatID : chat._id}).sort({date: -1}).skip(skip).limit(limit).exec();
    User.findById(nutritionistID).then(nut => {
    nut.hasNewMessage = false;
    nut.save();
    })

    res.status(200).json({chatID: chat._id, messages: messages});
    // update has new message
    
});

router.post('/',async (req, res, next) => {
    let msg = new Message(req.body);
    let user;
    msg.save().then(async result => {
        user = await User.findById(result.receiver).exec();
        user.hasNewMessage = true;
        user.save().then(result => {
            res.status(200).json({message : "message sent"});
        })
    })
})



module.exports = router;