const mongoose = require('mongoose');
const song = require('./song');

const playlistSchema = new mongoose.Schema({
    name: String,
    songs: [song.schema]
})

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    favorite_song: String,
    is_dj: Boolean,
    playlists: [playlistSchema]
});

module.exports = mongoose.model("user", userSchema, "users");