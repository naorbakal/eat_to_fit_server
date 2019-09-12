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

      const mesurment = await  BodyMeasurements.find({clientID: req.query.id}).sort({_id: -1}).limit(1).exec();
      if(mesurment){
        res.status(200).json(mesurment);
     }
     else{
         res.status(404).json(null);
     }
 });

module.exports = router;