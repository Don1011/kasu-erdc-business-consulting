require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const AdminsModel = require('../models/Admins');
const checkAdminExistence = require('../middleware/checkAdminExistence');
const auth = require('../middleware/auth');

// route to create new admin
router.post('/create-admin/', auth, checkAdminExistence, async (req, res) => {
    if(!req.adminExists){
        const {fullname, email, mobileNumber, adminStatus, password, bdsp} = req.body;
        const admin = new AdminsModel({
            fullName: fullname,
            email: email,
            mobileNumber: mobileNumber,
            adminStatus: adminStatus,
            password: password,
            bdsp: bdsp
        })
        try{
            await admin.save((err, savedAdmin) => {
                if(err) {
                    res.json({
                        success: false,
                        message: "Internal database error."
                    })
                }else{
                    res.json({
                        success: true,
                        message: "Successfully saved to the database.",
                        data: savedAdmin
                    })   
                }
            })
        }catch(err){
            res.json({
                success: false,
                message: "Failure in saving to the database."
            })
        }
    }else{
        res.json({
            success: false,
            message: "Sorry, an admin with this email already exists."
        })
    }

})

// route to fetch single admin based on ID
router.get('/fetch-admin/:id', auth, async (req, res) => {
    const adminId = req.params.id;
    try{
        await AdminsModel.findById(adminId, (err, admin) => {
            if(err){
                res.json({
                    success: false,
                    message: "Failure in fetching from the database.",
                    data: err
                })
            }else{
                if(admin){
                    res.json({
                        success: true,
                        message: "Admin successfully fetched.",
                        data: {admin, loggedUserEmail: req.user.email }
                    })
                }else{
                    res.json({
                        success: false,
                        message: "Admin doesn't exist.",
                        data: admin
                    })
                }
            }
        })
    }catch(err){
        res.json({
            success: false,
            message: "Failure in fetching from the database.",
            data: err
        })
    }
})

// route to fetch all admins 
router.get('/fetch-admins/', auth, async (req, res) => {
    try{
        await AdminsModel.find({}, (err, admins) => {
            if(err){
                res.json({
                    success: false,
                    message: "Failed to fetch admins.",
                    data: err
                })
            }else{
                res.json({
                    success: true,
                    message: "Successfully fetched all admins.",
                    data: admins
                })
            }
        })
    }catch(err){
        res.json({
            success: false,
            message: "Failed to fetch admins.",
            data: err
        })
    }
})

// route to delete particular admin
router.delete('/delete-admin/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        await AdminsModel.findByIdAndRemove(id, (err, admin) => {
            if(err){
                res.json({
                    success: false,
                    message: "Failed to delete.",
                    data: err
                })
            }else{
                res.json({
                    success: true,
                    message: "Successfully deleted admin.",
                    data: admin
                })
            }
        })        
    } catch (err) {
        res.json({
            success: false,
            message: "Failed to delete.",
            data: err
        })
    }
})

module.exports = router;