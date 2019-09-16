const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();

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
        let replicaMenu;
        if(user.menusIDs){
            replicaMenu = await Menu.findOne({
             replicaOf:user.menusIDs,
             date:{ 
                 $lt: new Date(), 
                 $gte: new Date().setHours(00,00,00) 
               }  
             });
     }
        if(replicaMenu){
            res.status(200).json(await menuUtils.createMenuJson(replicaMenu));  
        }
        else{
            let menu = await Menu.findById(menuId).exec();
            if(menu === null){
                res.sendStatus(404);
            }
            else{
                menu = await menuUtils.createMenuJson(menu);
                res.status(200).json(menu);
            }
        }
    }
    catch(err){
        res.status(500).json({
            message:err
        });
    }
});

router.post('/:id/menus',async (req, res, next) => {
    const menu = await menuUtils.saveMenuFromJson(req.body,true);
    
    User.findById(req.params.id)
    .then(client=>{
            client.menusIDs=menu._id;
            client.save(); 
            res.sendStatus(201);               
    });
});

router.post('/:id/report', async (req,res,next)=>{
        const user = await User.findById(req.params.id).exec();
        let replicaMenu = await Menu.findOne({
            replicaOf:user.menusIDs,
            date:{ 
                $lt: new Date(), 
                $gte: new Date().setHours(00,00,00) 
              }  
            });
        if(replicaMenu){
              await Menu.findByIdAndRemove(replicaMenu._id).exec();
        }
        replicaMenu = await menuUtils.saveMenuFromJson(req.body,false);
        replicaMenu.replicaOf = user.menusIDs;
        replicaMenu.date = new Date();
        replicaMenu = await replicaMenu.save();
        const response = await menuUtils.createMenuJson(replicaMenu);
        res.status(201).json(response);
})

module.exports = router;