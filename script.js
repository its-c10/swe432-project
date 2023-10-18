const HIDE_SHARE_SLIDER_CLASS = "hide-slider"
window.addEventListener('load', function() {
    document.querySelector('.share-btn').addEventListener('click', (e) => {
        document.querySelector('.share-slider').classList.toggle(HIDE_SHARE_SLIDER_CLASS);
    });

   

});

function showLyrics () {
    console.log("Testing");
}