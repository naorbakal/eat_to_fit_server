const mongoose = require("mongoose");
const express = require('express');
const menuUtils = require('./commons/menuUtils');
const router = express.Router();

const User=require('../../models/user');
const Menu = require ('../../models/menu');

router.post('/clients/:id',async (req, res, next) => {
        const menu = await menuUtils.saveMenu(req.body);
        User.findById(req.params.id)
        .then(client=>{
                client.menusIDs.push(menu._id);
                client.save(); 
                res.sendStatus(201);               
        });
});

router.get('/clients/:id',async (req,res,next)=>{
        let user = await User.findById(req.params.id).exec();
        if(!user.isNutritionist){
            let menuId = user.menusIDs[user.menusIDs.length - req.query.offset];
            let menu = await Menu.findById(menuId).exec();
            menu = await menuUtils.createMenuJson(menu);
            res.status(200).json({
                name:menu.name,
                meals:menu.meals
            })
        }
        else{ //nutritionist
            let menus = await Menu.find({ author : req.query.id}).exec();
            menu = await menuUtils.createMenuJson(menu);
            res.status(200).json({
                menus
            })
        }
});

router.get('/nutritionists/:nutritionistId',async(req,res,next)=>{
    const menus = await Menu.find({author:req.params.nutritionistId}).sort({date: -1}).select('_id name').exec();
    res.status(200).json({menus});
})

router.get('/:id',async (req,res,next)=>{
    let menu =await Menu.findById(req.params.id).exec();
    menu = await menuUtils.createMenuJson(menu);
    res.status(200).json({menu});
})

module.exports = router;