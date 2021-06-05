const NotificationsModel = require('../models/Notifications');

const notifications = async (linkId, message) => {
    const notif = new NotificationsModel({linkId, message});
    try{
        await notif.save((err, savedNotif) => {
            if(err) {
                return false;
            }else{
                return true;
            }
        })
    }catch(err){
        return false;
    }
    
}
module.exports = notifications;