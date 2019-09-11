const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
//const auth = require ("./auth");

const User = require ('../../models/user');
const Menu = require ('../../models/menu');

router.get('/:id',async (req,res,next)=>{
    let user = await User.findById(req.params.id).exec();
        let menuId = user.menusIDs[user.menusIDs.length - req.query.offset];
        let menu = await Menu.findById(menuId).exec();
        menu = await menuUtils.createMenuJson(menu);
        res.status(200).json({
            name:menu.name,
            meals:menu.meals
        })
});

router.post('/:id',async (req, res, next) => {
    const menu = await menuUtils.saveMenu(req.body);
    User.findById(req.params.id)
    .then(client=>{
            client.menusIDs.push(menu._id);
            client.save(); 
            res.sendStatus(201);               
    });
});

module.exports = router;