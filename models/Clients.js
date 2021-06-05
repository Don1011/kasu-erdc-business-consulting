const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClientsSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    pat: {
        type: String,
        required: true
    },
    an: {
        type: String,
        required: true
    },
    sat: {
        type: String,
        required: true
    },
    mc: {
        type: String,
        required: true
    },
    rsa: {
        type: String,
        required: true
    },
    naa: {
        type: String,
        required: true
    },
    ffu: {
        type: [String],
        required: true
    },
    admin: {
        type: {
            id: String,
            fullName: String,
            email: String,
            bdsp: String,
        },
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model("Clients", ClientsSchema);