const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


let allRadioHosts = [
    {
        name: "Caleb",
        favorite_song: "A Beautiful Lie",
        favorite_song_artist: "Three Days Grace",
        hiring_date: new Date(),
        age: 22,
        timesHosted: 1
    },
    {
        name: "John",
        favorite_song: "American Idiot",
        favorite_song_artist: "Green Day",
        hiring_date: new Date(),
        age: 21,
        timesHosted: 0
    }
]

let currentRadioHost = allRadioHosts[0];
let endTime = new Date();
endTime.setHours(endTime.getHours() + 1);
currentRadioHost.endTime = endTime; // added new property
currentRadioHost.timesHosted += 1; // modified property

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

app.listen(8080, () => {
    console.log('Listening on port 8080');
});