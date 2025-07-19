const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async(req, res)=>{
    try{
        const {username, password} = req.body;
        const existingUser = await User.findOne({ username })
        if(existingUser){
            return res.status(400).json({message : "usrename already exists"});
        }
        const newUser = new User({
            username,
            password
        })
        await newUser.save();
        res.status(201).json({message : "successfully registered"});
    }catch(err){
        console.log(err);
        res.status(500).json({message : "error"});
    }
})

module.exports = router;