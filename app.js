const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Song = require('./models/song');
const Dj = require('./models/dj');
let db = null;

setupMongoose();
initSongs();
setupExpress();

const songs = [
    new Song({id: 1, title: 'Testing title', yearReleased: 11, artist: 'Artist', comments: [{commenter: 'Caleb', comment: 'My comment FOR ID 1'}]}),
    new Song({id: 2, title: 'Testing 2', yearReleased: 12345, artist: 'Yo', comments: [{commenter: 'Caleb', comment: 'My comment'}]})
];

function setupMongoose() {
    mongoose.connect("mongodb+srv://calebjaowens:2uoIa1DYyeCxce2g@swe432-project.2n5dvs0.mongodb.net/?retryWrites=true&w=majority");
    db = mongoose.connection;
    db.once('open', () => {
        console.log('Connected to mongo');
    });
}

function initSongs() {
    db.once('open', () => {
        songs.forEach((song) => {
            Song.find({title: song.title}).then((res) => {
                // not a saved song/document
                if(res == '') {
                    console.log('Saved song: ' + song.title);
                    song.save();
                }
            });
        });
    });
}

function setupExpress() {

    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/public'));

    app.use(express.urlencoded({extended: 'false'}))
    app.use(express.json())

    app.get('/', (req, res) => {
        res.render('pages/index', {
            title: 'Home',
        });
    });
    app.get('/contact-us', (req, res) => {
        res.render('pages/contact-us', {
            title: 'Contact Us',
        });
    });
    app.get('/songs', (req, res) => {
        Song.find({}).then((data) => {
            res.render('pages/songs', {title: 'Songs', songs: data});
        });
    });
    app.get('/songs/:id', (req, res) => {
        let passedId = req.params.id;
        Song.find({id: passedId}).then((foundSong) => {
            res.render('pages/i-song', {song: foundSong[0], title: foundSong[0].title});
        });
    });
    app.post('/songs/make-comment/:id', (req, res) => {
        console.log('in here');
        let specifiedId = req.params.id;
        let cmmenter = req.body.commenter;
        let cmmnt = req.body.comment;
        Song.find({id: specifiedId}).then((foundSong) => {
            let s = foundSong[0];
            console.log(s.title);
            let comms = s.comments;
            comms.push({comment: cmmnt, commenter: cmmenter});
            console.log('COMMS: ' + comms);
            Song.updateOne({id: specifiedId}, {comments: comms}).then((err, docs) => {
                if(err) {
                    console.log(err);
                }else {
                    console.log('Updated docs: ' + docs);
                }
            });
        });
    });
    app.listen(8080, () => {
        console.log('Listening on port 8080');
    });
}