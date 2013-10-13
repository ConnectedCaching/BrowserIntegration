chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	if (!changeInfo.status) return;
	chrome.pageAction.hide(tabId);
	if (changeInfo.status != 'complete') return;

	var extractors = [
		// opencaching.com geocache detail page
		{
			match: [/http\:\/\/www\.opencaching\.com\/.*\/#!geocache\/.*/i],
			extractor: "extractors/opencaching.com.detail.js"
		},
		// opencaching.com map view
		{
			match: [/http:\/\/www\.opencaching\.com\/.*\/#find.*/i],
			extractor: "extractors/opencaching.com.map.js"
		},
		// geocaching.com detail page
		{
			match: [
				/http:\/\/www\.geocaching\.com\/geocache\/.*/i,
				/http:\/\/www\.geocaching\.com\/seek\/cache_details\.aspx.*/i
			],
			extractor: "extractors/geocaching.com.detail.js"
		}
	];

	extractors.some(function(matchDef) {
		return matchDef.match.some(function(match) {
			if (match.test(tab.url)) {
				chrome.pageAction.show(tabId);
				chrome.tabs.executeScript(tabId, {file: matchDef.extractor});
				return true;
			}
			return false;
		});
	});

});