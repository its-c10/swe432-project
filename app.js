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
    new Song({id: 1, title: 'A Beautiful Lie', yearReleased: 2005, artist: 'Thirty Seconds to Mars'}),
    new Song({id: 2, title: 'Break', yearReleased: 2009, artist: 'Three Days Grace'}),
    new Song({id: 3, title: 'American Idiot', yearReleased: 2004, artist: 'Green Day'}),
    new Song({id: 4, title: 'Hated You from Hello', yearReleased: 2011, artist: 'Downplay'}),
    new Song({id: 5, title: 'The Diary of Jane', yearReleased: 2004, artist: 'Breaking Benjamin'}),
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
        let specifiedId = req.params.id;
        let cmmenter = req.body.commenter;
        let cmmnt = req.body.comment;
        Song.find({id: specifiedId}).then((foundSong) => {
            let s = foundSong[0];
            let comms = s.comments;
            comms.push({comment: cmmnt, commenter: cmmenter});
            Song.updateOne({id: specifiedId}, {comments: comms}).then((err, docs) => {
                if(err) {
                    console.log(err);
                }else {
                    console.log('Updated docs: ' + docs);
                }
                res.redirect('back');
            });
        });
    });
    app.listen(8080, () => {
        console.log('Listening on port 8080');
    });
}