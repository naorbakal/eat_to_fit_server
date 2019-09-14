const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
const Menu = require ('../../models/menu');
const Meal = require ('../../models/meal');
const MealItem = require ('../../models/mealItem');
const Product = require ('../../models/product');
const menuUtils = require('../routes/commons/menuUtils');

router.get('/:id/menus',async (req,res,next)=>{
    try{
        let user = await User.findById(req.params.id).exec();
        let menuId = user.menusIDs;
        let menu = await Menu.findById(menuId).exec();
        if(menu === null){
            res.sendStatus(404);
        }
        else{
            menu = await menuUtils.createMenuJson(menu);
            res.status(200).json({
                name:menu.name,
                meals:menu.meals
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err
        });
    }

});

router.post('/:id/menus',async (req, res, next) => {
    console.log(req.body);
    const menu = await menuUtils.saveMenu(req.body);
    
    User.findById(req.params.id)
    .then(client=>{
            client.menusIDs=menu._id;
            client.save(); 
            res.sendStatus(201);               
    });
});

module.exports = router;