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