const HIDE_SHARE_SLIDER_CLASS = "hide-slider";
const HIDE_LYRICS_MODAL_CLASS = 'hide-lyrics';
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