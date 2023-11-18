const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    commenter: String,
    comment: String,
    date: String,
});

const songSchema = new mongoose.Schema({
    id: Number,
    title: String,
    yearReleased: Number,
    artist: String,
    duration: Number,
    comments: [commentSchema]
});

module.exports = mongoose.model("Song", songSchema, "song");