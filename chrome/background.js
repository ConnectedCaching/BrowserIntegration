chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (tab.url.match(/http\:\/\/www\.opencaching\.com\/.*\/#!geocache\/.*/i)) {
		chrome.pageAction.show(tabId);
	}
});