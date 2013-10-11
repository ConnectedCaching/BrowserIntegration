chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	var injectExtractor = function(fileName) {
		console.log('trigger injection of ' + fileName);
		chrome.tabs.sendMessage(tabId, {type: 'inject_extractor', file: fileName});
	};

	console.log(changeInfo.status + ' ' + tab.url);
	chrome.pageAction.hide(tabId);

	if (changeInfo.status != 'complete') return;

	// opencaching.com geocache detail page
	if (tab.url.match(/http\:\/\/www\.opencaching\.com\/.*\/#!geocache\/.*/i)) {
		chrome.pageAction.show(tabId);
		injectExtractor('extractors/opencaching.com.js');
	}

	// opencaching.com map view
	//if (currentUrl.match()) {
	//	chrome.pageAction.show(currentTabId);
	//}

});