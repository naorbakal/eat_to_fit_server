const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();

const Product = require ('../../models/product');

router.get('/',)

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

router.get('/',(req,res,next) => {
    try{
        Product.find({}, function(err, products) {
            //var productMap = {};
        
            //products.forEach(function(product) {
              //productMap[product._id] = product;
            //});
        
            res.status(200).json({data : products});  
          });
        
        /*
        Product.find().distinct('_id', function(error, names) {
            res.status(201).json({
                names : names
            })
        });
        */
    }
    catch(err){
        res.status(500).json({
            message:err
        });
    }
})


module.exports = router;