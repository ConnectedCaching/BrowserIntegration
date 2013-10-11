
chrome.runtime.onMessage.addListener(function(message, sender) {
	if (message.type == 'extracted_preview') {
		$.each(message.data, function(index, each) {
			$('main').append('<section class="card"><h1><strong>' + 
				each.geocache_id + '</strong></h1><h2>' + 
				each.geocache_title + '</h2></section>');
		});
	}
});

document.addEventListener('DOMContentLoaded', function () {
	// query current tab's extractor for displayed geocaches
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {type: "extract_preview"});
	});
});