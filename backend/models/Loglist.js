const mongoose = require('mongoose');

const LoglistSchema = new mongoose.Schema({
    topic : {type: String, required: true},
    description: {type: String},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
},{timestamps: true});

module.exports = mongoose.model("Loglist", LoglistSchema);