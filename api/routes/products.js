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

router.get('/',async (req,res,next) => {
    let products = await Product.find().collation({locale:'he' , strength : 2}).sort({ name : 1}).exec();
    
    res.status(200).json({data : products});
})


module.exports = router;