const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    commenter: String,
    comment: String,
    date: String,
});

const songSchema = new mongoose.Schema({
    title: String,
    yearReleased: Number,
    artist: String,
    duration: Number,
    comments: [commentSchema]
});

module.exports = mongoose.model("song", songSchema);