const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();
const Song = require('./models/song');
const Dj = require('./models/dj');
const User = require('./models/user.js');
let db = null;
let session;
let songIndex = 0;

setupMongoose();
initSongs();
setupExpress();

const songs = [
    new Song({id: 1, title: 'A Beautiful Lie', yearReleased: 2005, artist: 'Thirty Seconds to Mars'}),
    new Song({id: 2, title: 'Check Yes Juliet', yearReleased: 2007, artist: 'We The Kings'}),
    new Song({id: 3, title: 'Crawl Back In', yearReleased: 2009, artist: 'Dead By Sunrise'}),
    new Song({id: 4, title: 'Everything', yearReleased: 2015, artist: 'Bridge to Grace'}),
    new Song({id: 5, title: 'The Pretender', yearReleased: 2007, artist: 'Foo Fighters'}),
    new Song({id: 6, title: 'Jesus of Suburbia', yearReleased: 2004, artist: 'Green Day'}),
    new Song({id: 7, title: 'Over and Over', yearReleased: 2006, artist: 'Three Days Grace'}),
    new Song({id: 8, title: 'Thats What You Get', yearReleased: 2007, artist: 'Paramore'}),
    new Song({id: 9, title: 'The Kill', yearReleased: 2005, artist: 'Three Days Grace'}),
    new Song({id: 10, title: 'I Hate Everything About You', yearReleased: 2003, artist: 'Three Days Grace'}),
    new Song({id: 11, title: 'Savior', yearReleased: 2005, artist: 'Rise Against'}),
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

    app.use(express.urlencoded({extended: 'true'}));
    app.use(express.json());

    app.use(cookieParser());

    app.use(sessions({
        secret: "Z5okaS8bSwN5eLmVXg^zGc&5ApS2pM",
        saveUninitialized: true,
        cookie: { maxAge: (1000*60*60*24) }, // 1 day
        resave: false
    }));

    // use sessions to set current song index.
    app.get('/', (req, res) => {
        if(!req.session.currSongIndex) {
            req.session.currSongIndex = 0;
        }else {
            req.session.currSongIndex = req.currSongIndex;
        }
        res.render('pages/index', {
            title: 'Home',
            session: req.session,
            songList: JSON.stringify(songs),
        });
    });
    app.get('/contact-us', (req, res) => {
        res.render('pages/contact-us', {
            title: 'Contact Us',
            session: req.session,
        });
    });
    app.get('/songs', (req, res) => {
        Song.find({}).then((data) => {
            res.render('pages/songs', {title: 'Songs', songs: data, session: req.session});
        });
    });
    app.get('/songs/:id', (req, res) => {
        let passedId = req.params.id;
        Song.find({id: passedId}).then((foundSong) => {
            res.render('pages/i-song', {song: foundSong[0], title: foundSong[0].title, session: req.session,});
        });
    });
    app.get('/login-sign-up', (req,res) => {
        if(req.session.userid) {
            res.render('pages/index', {
                title: 'Home',
                session: req.session,
            });
        }else {
            res.render('pages/login-sign-up', {title: 'Login/Sign-Up', feedback: '', session: req.session});
        }
    });
    app.post('/login-sign-up', (req, res) => {
        var formUsername = req.body.username;
        var formPass = req.body.password;
        if(req.body.login_btn) {
            User.find({username: formUsername, password: formPass}).then((foundUser) => {
                if(foundUser.length == 0) { // No user with username and password (Could just be invalid password)
                    User.find({username: formUsername}).then((foundUser2) => {
                        if(foundUser2.length == 0) { // There is no user with this username
                            res.render('pages/login-sign-up', {title: 'Login/Sign-Up', feedback: 'No user found', session: req.session});
                        }else { // There is a valid user with this username, but they just had the password incorrect.
                            res.render('pages/login-sign-up', {title: 'Login/Sign-Up', feedback: 'Incorrect password', session: req.session});
                        }
                    });
                }else { // Valid login
                    session = req.session;
                    session.userid = formUsername;
                    res.render('pages/index', {title: 'Home', session: req.session});
                }
            });
        }else if (req.body.sign_up_btn){
            User.find({username: formUsername}).then((foundUser) => {
                if(foundUser.length != 0) { // User found with this username. Cannot register.
                    res.render('pages/login-sign-up', {title: 'Login/Sign-Up', feedback: 'User found', session: req.session});
                } else {
                    console.log('Username: ' + formUsername);
                    new User({id: formUsername, username: formUsername, password: formPass, is_dj: false}).save();
                    res.render('pages/login-sign-up', {title: 'Login/Sign-Up', feedback: 'User created. You may login.', session: req.session});
                }
            });
        }
    });
    app.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if(err) {
                console.log(err);
            }else {
                res.redirect('/');
            }
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