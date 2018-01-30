chrome.browserAction.onClicked.addListener((tab) => {
    if (tab.url.indexOf('https://soundcloud.com') !== -1) {
        chrome.tabs.executeScript(null, { file: 'shuffle.js' });
    } else {
        const url = window.prompt('Enter URL to Soundcloud Playlist', 'https://soundcloud.com/disco4dummies/sets/work-mixtapes');
        if (url) {
            chrome.tabs.create({ url });
        }
    }
});