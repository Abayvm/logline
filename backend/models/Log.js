const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    title : {type: String, required: true},
    content: {type: String, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    loglist: { type: mongoose.Schema.Types.ObjectId, ref: 'Loglist', default: null }
}, {timestamps: true});

module.exports = mongoose.model("Log", LogSchema);