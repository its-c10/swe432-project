const HIDE_SHARE_SLIDER_CLASS = "hide-slider";
const HIDE_LYRICS_MODAL_CLASS = 'hide-lyrics';
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
console.log('Host ' + currentRadioHost.name + ' is on until ' + currentRadioHost.endTime); // accessed property

window.addEventListener('load', function() {
    document.querySelector('.share-btn').addEventListener('click', () => {
        document.querySelector('.share-slider').classList.toggle(HIDE_SHARE_SLIDER_CLASS);
    });
});

function toggleLyrics () {
    let lyricsModal = document.querySelector('.lyrics-modal');
    let style = getComputedStyle(lyricsModal);
    if (style.visibility == "hidden") {
        lyricsModal.style.visibility = 'visible';
    }else {
        lyricsModal.style.visibility = 'hidden';
    }
}