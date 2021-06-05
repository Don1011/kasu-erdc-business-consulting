require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const AdminsModel = require('../models/Admins');
const checkAdminExistence = require('../middleware/checkAdminExistence');
const auth = require('../middleware/auth');

// route to log user in
router.post('/login/', checkAdminExistence, async (req, res) =>{
    if(req.adminExists){
        const { email, password } = req.body;
        const existingPassword = req.adminThatExists.password;
        if(password === existingPassword){
            try{
                const token = jwt.sign({email, password}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 86400}/*Expires in one day */);
                res.json({
                    success: true,
                    message: "User logged in successfully.",
                    data: {token, adminStatus : req.adminThatExists.adminStatus}
                })

            }catch(err){
                res.json({
                    success: false,
                    message: "Unable to create token.",
                    data: err
                })
            }
        }else{
            res.json({
                success: false,
                message: "You have supplied an incorrect password.",
                data: req.body
            })
        }
    }else{
        res.json({
            success: false,
            message: "Sorry, this admin doesn't exist.",
            data: req.body
        })
    }
})

router.get('/get-admin/', auth, async (req, res) => {
    try{
        await AdminsModel.findOne({email: req.user.email})
            .select("-password")
            .then(user => {
                // console.log(user)
                res.json({
                    success: true,
                    message: "Admin successfully fetched.",
                    data: user
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Error in fetching Admin.",
                    data: err
                })
            })
    }catch(err){
        res.json({
            success: false,
            message: "Error in fetching Admin.",
            data: err
        })
    }
})

router.put('/update-profile/', auth, async (req, res) => {
    const { name, bdsp, mobileNumber } = req.body;
    try{
        await AdminsModel.findOne({email: req.user.email}, (err, result) => {
            if(err){
                res.json({
                    success: false,
                    message: "Error in fetching user.",
                    data: err
                })
            }else{
                result.fullName = name;
                result.bdsp = bdsp;
                result.mobileNumber = mobileNumber;
                result.save();
                res.json({
                    success: true,
                    message: "Successfully updated."
                })
            }
        })
    }catch(err){
        res.json({
            success: false,
            message: "Error in updating database."
        })
    }
})

module.exports = router;