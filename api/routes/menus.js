const mongoose = require("mongoose");
const express = require('express');
const menuUtils = require('./commons/menuUtils');
const router = express.Router();

const User=require('../../models/user');
const Menu = require ('../../models/menu');

router.get('/:id',async (req,res,next)=>{
    try{
        let menu =await Menu.findById(req.params.id).exec();
        menu = await menuUtils.createMenuJson(menu);
        res.status(200).json({menu});
    }
    catch(err){
        res.status(500).json({
            message:err
        });
    }
})

router.get('/:id/nutritionalValues', async (req,res,next) => {
    const user = await User.findById(req.params.id).exec(); 

    const menu = await Menu.findById(user.menusIDs).exec();

    res.status(200).json({
        calories : menu.calories,
        protein : menu.protein,
        carbs : menu.carbs,
        fat : menu.fat
    })
})

module.exports = router;