chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	if (!changeInfo.status) return;

	console.log(changeInfo.status + ' ' + tab.url);
	chrome.pageAction.hide(tabId);

	if (changeInfo.status != 'complete') return;

	// opencaching.com geocache detail page
	if (tab.url.match(/http\:\/\/www\.opencaching\.com\/.*\/#!geocache\/.*/i)) {
		chrome.pageAction.show(tabId);
		chrome.tabs.executeScript(tabId, {file: "extractors/opencaching.com.detail.js"});
	}

	// opencaching.com map view
	if (tab.url.match(/http:\/\/www.opencaching.com\/.*\/#find.*/i)) {
		chrome.pageAction.show(tabId);
		chrome.tabs.executeScript(tabId, {file: "extractors/opencaching.com.map.js"});
	}

});