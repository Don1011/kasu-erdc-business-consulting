require('dotenv').config();
const express = require('express');
const router = express.Router();
const NotificationsModel = require('../models/Notifications');
const auth = require('../middleware/auth');

router.get('/get-notifications/', auth, async (req, res) => {
    try{
        await NotificationsModel.find({}, (err, results) => {
            if(err){
                res.json({
                    success: false,
                    message: "Database error.",
                    data: err
                })
            }else{
                // console.log(results);
                res.json({
                    success: true,
                    message: "Successfully fetched.",
                    data: results
                })
            }
        })
    }catch(err){
        res.json({
            success: false,
            message: "Error in fetching notifications.",
            data: err
        })
    }
})

module.exports = router;