const HIDE_SHARE_SLIDER_CLASS = "hide-slider";
const HIDE_LYRICS_MODAL_CLASS = 'hide-lyrics';
/* Upon loading the web page, add an event listener that listens for the clicking of the share button */
window.addEventListener('load', function() {
    this.document.querySelector('.share-btn').addEventListener('click', () => {
        document.querySelector('.share-slider').classList.toggle(HIDE_SHARE_SLIDER_CLASS);
    });
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
    let currSongIndex = sessionStorage.getItem('currSongIndex');
    let json = JSON.parse(songDataStr);
    
    currSongIndex++;
    if(currSongIndex >= json.length) {
        currSongIndex = 0;
    }
    sessionStorage.setItem('currSongIndex', currSongIndex);

    let nextSong = json[currSongIndex];
    let audioSource = document.getElementById('media-source');
    let img = document.getElementById('music-pic');
    let pathAudio = 'media/' + nextSong.title.toLowerCase().split(' ').join('_') + ".mp3";
    let pathImg = 'media/' + nextSong.title.toLowerCase().split(' ').join('_') + ".jpg";
    img.src = pathImg;
    audioSource.src = pathAudio;

    let songTitle = document.getElementById('song-title');
    let songArtist = document.getElementById('song-artist');

}
