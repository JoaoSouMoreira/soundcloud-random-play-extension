document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');

    const template1 = `<button id="soundcloud-true-shuffler">Shuffle</button>`;
    const template2 = `<label for="url">URL</label>
        <input id="url" type="text" />
        <button id="navigate-to-url">Play Random</button>`;

    chrome.tabs.getSelected(null, (tab) => {
        if (tab.url.indexOf('https://soundcloud.com') !== -1) {
            container.innerHTML = template1;
            setShuffleEventListener();
        } else {
            container.innerHTML = template2;
            setNavigateEventListener();
        }
    });
});

function setShuffleEventListener() {
    document.getElementById('soundcloud-true-shuffler').addEventListener('click', () => {
        chrome.tabs.executeScript(null, { file: 'shuffle.js' });
    });
}

function setNavigateEventListener() {
    const defaultURL = 'https://soundcloud.com/disco4dummies/sets/work-mixtapes';
    const inputBox = document.getElementById('url');
    inputBox.value = defaultURL;
    document.getElementById('navigate-to-url').addEventListener('click', () => {
        chrome.tabs.create({ url: inputBox.value });
    })
}