function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

function scroll() {
    window.scrollTo(0, document.body.scrollHeight);

    sleep(300).then(function () {
        if (document.querySelector('.paging-eof')) {
            selectRandom();
        } else {
            scroll();
        }
    });
}

function selectRandom() {
    const tracks = document.querySelectorAll('.trackList__item.sc-border-light-bottom');
    tracks[Math.floor(Math.random() * Math.floor(tracks.length))].querySelector('a').click();
}

function main() {
    if (document.querySelector('.paging-eof')) {
        selectRandom();
    } else {
        scroll();
    }
}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}