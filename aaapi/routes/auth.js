const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../Models/User');

router.post("/login",async (req,res)=>{

    const user = await User.findOne({
        email:req.body.email
    });
    if(!user) return res.status(400).send("Email dosen't exist");
    const validPass = await bcrypt.compare(
        req.body.password,
        user.password 
        );
    
    if(!validPass) return res.status(400).send("wrong password");
    
    try{
        const token = jwt.sign({_id:user._id},
            "tokenSecretkey")
        res.header('auth-token',token).send(token);

    }catch(err){
        console.log("error")
        console.log(err)
        // res.send(err)
    }
    
});


router.post("/register",async (req,res)=>{
    // Hash the password
    const salt = await bcrypt.genSalt(2);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    console.log(salt,hashedPassword)
    const user = new User({
        name:req.body.name, 
        email:req.body.email, 
        password: hashedPassword
    });
    
    try{
        const savedUser = await user.save();
        console.log(savedUser);
        res.send(savedUser);
        return
    }catch(err){
        res.status(400).send(err);
        return
    }

    // res.send(user);
});


module.exports = router;