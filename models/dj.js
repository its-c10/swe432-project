const mongoose = require('mongoose');

const djSchema = new mongoose.Schema({
    name: String,
    favorite_song: String,
    favorite_song_artist: String,
    hiring_date: String,
    age: Number,
    timesHosted: Number
});

module.exports = mongoose.model("Dj", djSchema, "djs");