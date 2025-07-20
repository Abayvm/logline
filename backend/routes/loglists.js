const express = require('express');
const router = express.Router();
const Loglist = require('../models/Loglist');
const User = require('../models/User');
const Log = require('../models/Log')

router.post('/api/loglists', async(req, res)=>{
    try{
        const {topic, description, author} = req.body;
        const slug = require('slugify')(topic, { lower: true, strict: true });
        const existingSlug = await Loglist.findOne({ author, slug });
            if(existingSlug){
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

router.get('/api/:userId/loglists', async(req, res)=>{
    try{
        const userId = req.params.userId;
        const loglists = await Loglist.find({ author: userId });
        res.status(200).json(loglists);
    }catch(err){
        console.log(err);
        res.status(500).json({message : "error"});
    }
})

router.get('/:username/:slug/logs', async(req, res)=>{
    const {username, slug} = req.params;
    try{
        const user = await User.findOne({username});
        if(!user) return res.status(404).json({ message: 'User not found' });

        const loglist = await Loglist.findOne({author: user._id, slug})
        if(!loglist) return res.status(404).json({ message: 'Loglist not found' });

        const logs = await Log.find({ loglist: loglist._id });
        res.json({ topic: loglist.topic, logs });
    }catch(err){
        console.log(err);
        res.status(500).json({message : "error"});
    }
})

module.exports = router;