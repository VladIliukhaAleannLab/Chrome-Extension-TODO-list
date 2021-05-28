
chrome.extension.onRequest.addListener(async function(request, sender, sendResponse)
{
    const {action, data} = request;
    console.log('okok');
    switch (action) {
        case 'alert':
            const {text} = data;
            alert(text);
            sendResponse({status: 'ok'});
            break;
    }

});
