const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async(req, res)=>{
    try{
        const {username, password} = req.body;
        const existingUser = await User.findOne({ username })
        if(existingUser){
            return res.status(400).json({message : "username already exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password : hashedPassword
        })
        await newUser.save();
        res.status(201).json({message : "successfully registered"});
    }catch(err){
        console.log(err);
        res.status(500).json({message : "error"});
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "invalid credentials" });

        const payload = { _id: user._id, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ message: "login successful", token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "error" });
    }
})

module.exports = router;