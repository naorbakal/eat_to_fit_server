const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();

const BodyMeasurements = require ('../../models/bodyMeasurements');

// check route!!!!
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
        const bm = new BodyMeasurements(req.body);
        bm.find({ClientID: req.session._id})
		.then(response=>{
			res.status(200).json(response);
		})
        const bm = new BodyMeasurements(req.body);
    
})

module.exports = bodyMeasurementsRoute;