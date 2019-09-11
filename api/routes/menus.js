const mongoose = require("mongoose");
const express = require('express');
const menuUtils = require('./commons/menuUtils');
const router = express.Router();

const User=require('../../models/user');
const Menu = require ('../../models/menu');

router.get('/:id',async (req,res,next)=>{
    let menu =await Menu.findById(req.params.id).exec();
    menu = await menuUtils.createMenuJson(menu);
    res.status(200).json({menu});
})

module.exports = router;