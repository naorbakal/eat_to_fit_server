const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();

const BodyMeasurements = require ('../../models/bodyMeasurements');

router.post('/',(req, res, next) => {
    const bm = new BodyMeasurements(req.body);
        bm 
            .save()
            .then(result => {
            res.status(201).json({
            message: "Handle bodyMeasurements req",
            createdBodyMeasurements: result
        })
    })
    .catch(err=>{
                res.status(422).json({
                message: err.message
                    })
                });  
        });


router.get('/',async(req, res, next) => {
    const mesurment = await  BodyMeasurements.find({clientID: req.query.id}).sort({_id: -1}).limit(7).exec();

    if(mesurment.length === 0){
        res.status(404).json(null);
    }
    else{
        if(req.query.all){
                res.status(200).json(mesurment[0]);
            }
        else{
                res.status(200).json(mesurment);
            }
    }
 });

module.exports = router;