const jwt = require('jsonwebtoken');

module.exports = function auth(req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token,"tokenSecretkey");
        req.user = verified;
        // console.log("verifying ::::::::::::  :::::::::::::::::::::  ::::::::::::")
        // console.log(JSON.stringify(verified._id));
        next();
        // return verified._id;
    }catch(err){
        console.log(err)
        res.status(400).send("invalid token");
    }
}