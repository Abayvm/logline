const express = require('express');
const router = express.Router();
const Loglist = require('../models/Loglist');

router.post('/api/loglists', async(req, res)=>{
    try{
        const {topic, description, author} = req.body;
        const existingTopic = await User.findOne({ topic, author });
            if(existingTopic){
                return res.status(400).json({message : `${topic} already exists under your usrename`});
            }
        const newLoglist = new Loglist({
            topic,
            description,
            author
        });
        await newLoglist.save();
        res.status(201).json(newLoglist);
    }catch(err){
        console.log(err);
        res.status(500).json({message : "error"});
    }
})