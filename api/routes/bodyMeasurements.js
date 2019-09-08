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


router.get('/',(req, res, next) => {
        //const bm = new BodyMeasurements();
        console.log(req.query.id);
        BodyMeasurements.find({clientID: req.query.id})
        .sort({_id: -1})
        .limit(1)
        .exec()
        .then(response=>{
            res.status(200).json(response);
        })
    });

module.exports = router;