function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function scroll() {
    window.scrollTo(0, document.body.scrollHeight);

    sleep(300).then(() => {
        if (document.querySelector('.paging-eof')) {
            removeToast();
            selectRandom();
        } else {
            scroll();
        }
    });
}

function selectRandom() {
    const tracks = document.querySelectorAll('.trackList__item.sc-border-light-bottom');
    const randomIndex = Math.floor(Math.random() * Math.floor(tracks.length));
    let clicked = false;

    // Check if track is properly loaded, otherwise it needs to retry
    if (tracks[randomIndex].querySelector('a.playButton')) {
        tracks[randomIndex].querySelector('a.playButton').click();
    } else {
        const interval = setInterval(() => {
            if (clicked)
                clearInterval(interval);
            if (tracks[randomIndex].querySelector('a.playButton')) {
                clicked = true;
                tracks[randomIndex].querySelector('a.playButton').click();
            }
        }, 100);
    }
}

function displayToast() {
    const style = `
        width:300px;
        height:30px;
        position:fixed;
        left:50%;
        margin-left:-150px;
        bottom:50%;
        background-color: #383838;
        color: #F0F0F0;
        font-family: sans-serif;
        font-size: 20px;
        padding:10px;
        text-align:center;
        border-radius: 2px;
        z-index: 1000;
        -webkit-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);
        -moz-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);
        box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);`;
    const toast = document.createElement('div');
    toast.id = 'sc-random-toast';
    toast.style = style;
    toast.innerText = 'Loading All Tracks. Please wait.';
    document.body.appendChild(toast);
}

function removeToast() {
    const toast = document.getElementById('sc-random-toast');
    toast.parentNode.removeChild(toast);
}

function main() {
    if (document.querySelector('.paging-eof')) {
        selectRandom();
    } else {
        displayToast();
        scroll();
    }
}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}