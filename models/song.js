const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
    yearReleased: Number,
    artist: String,
    duration: Number
});

const songModel = mongoose.model('Song', songSchema);