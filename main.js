chrome.browserAction.onClicked.addListener((tab) => {
    const scRegex = /^http(s)?:\/\/soundcloud.com\/(\w|-|_)+\/sets\/(\w|-|_)+$/;
    if (scRegex.test(tab.url)) {
        chrome.tabs.executeScript(null, { file: 'shuffle.js' });
    } else {
        const url = window.prompt('Enter URL to Soundcloud Playlist', 'https://soundcloud.com/disco4dummies/sets/work-mixtapes');
        if (url) {
            chrome.tabs.create({ url });
        }
    }
});