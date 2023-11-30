const HIDE_SHARE_SLIDER_CLASS = "hide-slider";
const HIDE_LYRICS_MODAL_CLASS = 'hide-lyrics';

/* Upon loading the web page, add an event listener that listens for the clicking of the share button */
window.addEventListener('load', function() {

    let shareBtn = this.document.querySelector('.share-btn');
    if(shareBtn) {
        shareBtn.addEventListener('click', () => {
            document.querySelector('.share-slider').classList.toggle(HIDE_SHARE_SLIDER_CLASS);
        });
    }

    let audio = document.getElementById('audio');
    if(audio) {
        let volume = this.localStorage.getItem('audio-volume');
        let currTime = this.localStorage.getItem('audio-curr-time');
        let paused = this.localStorage.getItem('audio-paused');
        if(volume) { // if one is set, then the rest will be set.
            audio.volume = volume;
            audio.currentTime = currTime;
            if(paused === 'false') {
                audio.play();
            }
        }
    
        fetch('/getSongIndex', {method: 'GET'})
            .then(response => response.json())
            .then(data => generateNextUpSongs(data.songIndex));
    }

    fetch('/getCurrSongs', {method: 'GET'})
        .then(response => response.json())
        .then(data => generateDJSongList(data.songs));

});

function generateDJSongList(currentSongData) {

    let currList = $("#inner-curr-list");
    if(currList) {
        currList.html('');
        let jsonCurrSongs = JSON.parse(currentSongData);
        for(let i = 0; i < jsonCurrSongs.length; i++) {
            let btn = `<button id='remove-btn' style='margin-left: 15px' onClick=removeSong(${jsonCurrSongs[i].id})>Remove</button>`;
            currList.append(`<p style='display: inline-block;'>` + jsonCurrSongs[i].title + " by " + jsonCurrSongs[i].artist +  `</p>${btn}<br>`);
        }
    }
}

function removeSong(song) {
    fetch(`/removeSong/${song.id}`, {method: 'GET'})
        .then(response => {
            if(!response.ok) {
                console.log(response.statusText);
            }else{
                generateDJSongList();
            }
        });
}

window.addEventListener('beforeunload', function() {

    let audio = document.getElementById('audio');
    if(audio) {
        this.localStorage.setItem('audio-volume', audio.volume);

        let currTime = audio.currentTime;
        if(currTime != 0 && (audio.duration - currTime) > 2) { // not at start or end
            this.localStorage.setItem('audio-curr-time', currTime);
        }else {
            this.localStorage.setItem('audio-curr-time', 0);
        }
    
        this.localStorage.setItem('audio-paused', audio.paused);
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

function generateNextUpSongs(currSongIndex) {

    let songDataStr = document.getElementById("song-data").textContent;
    let json = JSON.parse(songDataStr);
    let nextSongsDiv = $("#next-songs");
    nextSongsDiv.html('');

    let nextIndex = currSongIndex+1;
    for(let i = 0; i < 3; i++) {
        if(nextIndex+i >= json.length) {
            nextIndex = 0;
        }
        let path = `/songs/${json[nextIndex+i].id}`;
        let element = `<a href=${path}>${json[nextIndex+i].title + ' by ' + json[nextIndex+i].artist}</a>${i == 0 ? ' (Next)' : ''}<br>`;
        nextSongsDiv.append(element);
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
            generateNextUpSongs(nextSongIndex);
            let nextSong = json[nextSongIndex];
            let pathAudio = '../media/' + nextSong.title.toLowerCase().split(' ').join('_') + ".mp3";
            let pathImg = '../media/' + nextSong.title.toLowerCase().split(' ').join('_') + ".jpg";
            img.src = pathImg;
            audioSource.src = pathAudio;
            
            audio.load();
            audio.play();

            songTitle.textContent = nextSong.title;
            songArtist.textContent = nextSong.artist;

        });

}