const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    // const token = req.header("x-auth-token");

    let token = req.header("Authorization");
    token = token.split(' ')[1];

    //const token = `${req.header.authorization}`.split(' ')[1]
    // console.log(token);
    if(!token){
        res.json({
            success: false,
            message: "Authorization Denied, no token."
        })
    }else{
        try{
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
            next();
        }catch(err){
            res.json({
                success: false,
                message: "Invalid token.",
                data : err
            })
        }
    }
    
}

module.exports = auth;