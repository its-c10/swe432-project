const HIDE_SHARE_SLIDER_CLASS = "hide-slider";
const HIDE_LYRICS_MODAL_CLASS = 'hide-lyrics';

/* Upon loading the web page, add an event listener that listens for the clicking of the share button */
window.addEventListener('load', function() {
    this.document.querySelector('.share-btn').addEventListener('click', () => {
        document.querySelector('.share-slider').classList.toggle(HIDE_SHARE_SLIDER_CLASS);
    });

    let audio = document.getElementById('audio');
    let volume = this.localStorage.getItem('audio-volume');
    let currTime = this.localStorage.getItem('audio-curr-time');
    if(volume && currTime) {
        audio.volume = volume;
        audio.currentTime = currTime;
    }

});

window.addEventListener('beforeunload', function() {

    let audio = document.getElementById('audio');
    this.localStorage.setItem('audio-volume', audio.volume);

    let currTime = audio.currentTime;
    if(currTime != 0 && (audio.duration - currTime) > 2) { // not at start or end
        this.localStorage.setItem('audio-curr-time', currTime);
    }else {
        this.localStorage.setItem('audio-curr-time', 0);
    }

});

/* Toggle the showing or hiding of the lyrics modal */
function toggleLyrics () {
    let lyricsModal = document.querySelector('.lyrics-modal');
    let style = getComputedStyle(lyricsModal);
    if (style.visibility == "hidden") {
        lyricsModal.style.visibility = 'visible';
    }else {
        lyricsModal.style.visibility = 'hidden';
    }
}

function changeSong() {

    let songDataStr = document.getElementById("song-data").textContent;
    let json = JSON.parse(songDataStr);
    let audioSource = document.getElementById('media-source');
    let img = document.getElementById('music-pic');
    let songTitle = document.getElementById('song-title');
    let songArtist = document.getElementById('song-artist');
    let audio = document.getElementById('audio');

    fetch('/getNextSongIndex', {method: 'GET'})
        .then(response => response.json())
        .then(data => {

            let nextSongIndex = data.songIndex;
            console.log("Song index: " + nextSongIndex);
            let nextSong = json[nextSongIndex];
            let pathAudio = 'media/' + nextSong.title.toLowerCase().split(' ').join('_') + ".mp3";
            let pathImg = 'media/' + nextSong.title.toLowerCase().split(' ').join('_') + ".jpg";
            img.src = pathImg;
            audioSource.src = pathAudio;
            
            audio.load();
            audio.play();

            songTitle.textContent = nextSong.title;
            songArtist.textContent = nextSong.artist;

        });

}