require('dotenv').config();
const express = require('express');
const router = express.Router();
const ClientsModel = require('../models/Clients');
const auth = require('../middleware/auth');
const crypto = require('crypto');
const notifications = require('../functions/notifications.js')

router.post('/create-folder/', auth, async (req, res) => {
    // => fullname => age => email => mobileNumber => businessName => cardNumber => pat => an => sat => mc => rsa => naa => ffu 
    const randHex = crypto.randomBytes(2).toString('hex'); //Generates 4 random bytes and convert to hexadecimal
    const randNum = (Math.random()).toString().substring(2,6);//Generate 4 random integers and convert to string
   
    const rand = `${randHex}${randNum}`;
    const { fullname, age, email, mobileNumber, businessName, pat, an, sat, mc, rsa, naa, ffu, admin } = req.body;
    const cardNumber = `${admin.bdsp}-${rand}`;

    const newFolder = new ClientsModel({
        fullName : fullname,
        age : age,
        email : email,
        mobileNumber : mobileNumber,
        businessName : businessName,
        cardNumber : cardNumber,
        pat : pat,
        an : an,
        sat : sat,
        mc : mc,
        rsa : rsa,
        naa : naa,
        ffu  : ffu,
        admin: admin 
    })
    try{
        await newFolder.save((err, savedFolder) => {
            if(err) {
                res.json({
                    success: false,
                    message: "Internal database error."
                })
            }else{
                const linkId = savedFolder.id;
                const notificationMessage = `${admin.fullName} created a new folder for ${savedFolder.fullName}`;
                notifications(linkId, notificationMessage);
                res.json({
                    success: true,
                    message: "Successfully saved to the database.",
                    data: savedFolder
                })  

            }
        })
    }catch(err){
        res.json({
            success: false,
            message: "Failure in saving to the database.",
            data: err
        })
    }
    
})

router.get('/fetch-client/:id', auth, async (req, res) => {
    const folderId = req.params.id;
    try{
        await ClientsModel.findById(folderId, (err, folder) => {
            if(err){
                res.json({
                    success: false,
                    message: "Failure in fetching from the database.",
                    data: err
                })
            }else{
                if(folder){
                    res.json({
                        success: true,
                        message: "Folder successfully fetched.",
                        data: folder
                    })
                }else{
                    res.json({
                        success: false,
                        message: "Folder doesn't exist.",
                        data: folder
                    })
                }
            }
        })    
    }catch(err){
        res.json({
            success: false,
            message: "Error fetching data.",
            data: err
        })
    }
})

router.get('/fetch-clients/', auth, async (req, res) => {
    try{
        await ClientsModel.find({}, (err, clients) => {
            if(err){
                res.json({
                    success: false,
                    message: "Error in fetching data from database.",
                    data: err
                })
            }else{
                if(clients.length <= 0){
                    res.json({
                        success: true, 
                        message: "No folder has been created.",
                        data: []
                    })
                }else{
                    // console.log(clients)
                    res.json({
                        success: true, 
                        message: "Successfully fetched clients from database.",
                        data: clients
                    })
                }
            }
        })
        .select({ _id: 1, fullName: 1, email: 1, mobileNumber: 1 })
    }catch(err){
        res.json({
            success: false,
            message: "Error in fetching data.",
            data: err
        })
    }
})

router.put('/update-folder', auth, async (req, res) => {

    const { id, eventKey, newEdit } = req.body;
    try{
        await ClientsModel.findById(id, (err, folder) => {
            if(err){
                res.json({
                    success: false,
                    message: "Update failed.",
                    data: err
                })

            }else{
                switch(eventKey) {
                    //  pat => an => sat => mc => rsa => naa 
                    case "pat":
                        folder.pat = newEdit;
                        break;
                    case "an":
                        folder.an = newEdit;
                        break;
                    case "sat":
                        folder.sat = newEdit;
                        break;
                    case "mc":
                        folder.mc = newEdit;
                        break;
                    case "rsa":
                        folder.rsa = newEdit;
                        break;
                    case "naa":
                        folder.naa = newEdit;
                        break;
                    default:
                        res.json({
                            success: false,
                            message: "Invalid event key, code tampered.",
                            data: err
                        })
                }
                folder.save();
                res.json({
                    success: true,
                    message: "Updated successfully."
                })
            }
        })
    }catch(err){
        res.json({
            success: false,
            message: "Update Error!",
            data: err
        })
    }
})

router.put('/add-feedback', auth, async (req, res) => {

    const { id, feedback } = req.body;
    try{
        await ClientsModel.findById(id, (err, folder) => {
            if(err){
                res.json({
                    success: false,
                    message: "Update failed.",
                    data: err
                })
            }else{
                folder.ffu.push(feedback)
                folder.save();
                res.json({
                    success: true,
                    message: "Feedback added. Refresh the page to view."
                })
            }
        })
    }catch(err){
        res.json({
            success: false,
            message: "Update Error!",
            data: err
        })
    }
   
})


module.exports = router;