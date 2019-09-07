const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();

const Product = require ('../../models/product');

router.post('/',(req, res, next) => {
    const product = new Product(req.body);
    product 
    .save()
    .then(result => {
    res.status(201).json({
    message: "Handle product req",
    createdBodyMeasurements: result
    })
})
    .catch(err=>{
        res.status(422).json({
        message: err.message
            })
        });  
});

router.get('/names',(req,res,next) => {
    Product.find().distinct('name', function(error, names) {
        res.status(201).json({
            names : names
        })
    });
})


module.exports = router;