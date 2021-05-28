/* global chrome */

const domAction = (action, data) => {
    return new Promise(resolve => {
        chrome.tabs.getSelected(null, function(tab)
        {
            // Send a request to the content script.
            chrome.tabs.sendRequest(tab.id, {action: action, data: data}, function (res) {
                resolve(res)
            });
        });
    })
};

export default domAction;
