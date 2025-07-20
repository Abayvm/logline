const express = require('express');
const router =  express.Router();
const Log = require('../models/Log')

router.post('/api/logs', async(req, res)=>{
    try{
        const {title, content, loglist} = req.body;
        const newLog = new Log({
            title,
            content,
            author: req.user._id,
            loglist
        })
        await newLog.save();
        res.status(201).json({message: "logged successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({message : "error"});
    }
})

router.get('/api/logs/:id', async(req, res)=>{
    try{
        const log = await Log.findById(req.params.id);
        if(!log) return res.status(404).json({ message: 'log not found' });
        res.status(200).json(log);
    }catch(err){
        console.log(err);
        res.status(500).json({message : "error"});
    }
})

router.put('/api/logs/:id', async(req, res)=>{
    try{
        const {title, content} = req.body;
        const updatedLog = await Log.findByIdAndUpdate(
            req.params.id,
            {title, content},
            {new: true, runValidators: true }
        )
        if (!updatedLog) return res.status(404).json({ message: "log not found" });
        res.status(200).json({message: "log updated!", log: updatedLog })
    }catch(err){
        console.log(err);
        res.status(500).json({message : "error"});
    }
})

router.delete('/api/logs/:id', async(req, res)=>{
    try{
        const deleteLog = await Log.findByIdAndDelete(req.params.id);
        if (!deleteLog) return res.status(404).json({ message: 'log unavailable' });
        res.status(200).json({message: "log deleted"});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "error"});
    }
})

module.exports = router;