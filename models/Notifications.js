const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotificationsModel = new Schema({
    linkId: String,
    message: String
})

module.exports = mongoose.model("Notifications" , NotificationsModel)