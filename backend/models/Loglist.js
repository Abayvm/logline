const mongoose = require('mongoose');
const slugify = require('slugify');

const LoglistSchema = new mongoose.Schema({
    topic : {type: String, required: true},
    description: {type: String},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
},{timestamps: true});

LoglistSchema.pre('validate', function(next) {
    if (this.topic) {
        this.slug = slugify(this.topic, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model("Loglist", LoglistSchema);