const AdminsModel = require('../models/Admins');

const checkAdminExistence = async (req, res, next) => {
    const { email } = req.body;
    try{
        await AdminsModel.findOne( { email }, ( err, result ) => {
            if(err){
                res.json({
                    success: false,
                    message: "Failure in verifying admin existence.",
                    data: err
                })
            }else{
                req.adminExists = (result) ? true : false;
                req.adminThatExists = result;
                // console.log(result);
                next();
            }
        })
    }catch(err){
        res.json({
            success: false,
            message: "Failure in verifying admin existence.",
            data: err
        })
    }

}

module.exports = checkAdminExistence;