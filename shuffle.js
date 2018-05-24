function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function convertTimeToSeconds(timeString) {
    var separated = timeString.split(':');

   var seconds = parseInt(separated[separated.length - 1]);
    var minutes = separated.length > 1 ? parseInt(separated[separated.length - 2]) : 0;
    var hours = separated.length > 2 ? parseInt(separated[0]) : 0;

    return (hours * 3600) + (minutes * 60) + seconds;
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

    setShuffleEvent();
}

function setShuffleEvent() {
    setTimeout(function() {
        var passedTime = document.querySelector('.playbackTimeline__timePassed span:last-child').innerText;
        var totalTime = document.querySelector('.playbackTimeline__duration span:last-child').innerText;
        var passedSeconds = convertTimeToSeconds(passedTime);
        var totalSeconds = convertTimeToSeconds(totalTime);

        var secondsToFinish = totalSeconds - passedSeconds;

        var shuffleTimeout = setTimeout(selectRandom, (secondsToFinish - 2) * 1000);
        console.log('shuffling in ' + secondsToFinish + ' seconds');

        document.querySelector('.playControls__next').addEventListener('click', function() {
            clearTimeout(shuffleTimeout);
            document.querySelector('.playControls__next').removeEventListener('click');
        });
    }, 3000);
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

document.addEventListener('keypress', (e) => {
    if (e.keyCode === 72 && (e.metaKey === '⌘-' || e.ctrlKey && e.keyCode)) {
        main();
    }
});