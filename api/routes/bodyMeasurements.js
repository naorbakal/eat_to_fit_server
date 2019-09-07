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


router.get('/:id',(req, res, next) => {
        const bm = new BodyMeasurements();
        bm.find({clientID: req.params.id})
        .sort({_id: -1})
        .limit(1)
        .exec()
        .then(response=>{
            res.status(200).json(response);
        })
    });

module.exports = router;