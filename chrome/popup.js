
function displayLoginWarning() {
	$('main').prepend('<section class="card"><h1><strong class="warning">Sign In Required</strong></h1><h2>' + 
		'Please <a href="#" class="warning">sign in</a> to your Connected Caching account!</h2></section>');
}

document.addEventListener('DOMContentLoaded', function () {
	// check if user is signed in to Connected Caching
	chrome.cookies.get({url: 'http://localhost/*', name: 'authToken'}, function(cookie) {
		console.dir(cookie);
		if (cookie == null) return displayLoginWarning();
	});

	// query current tab's extractor for displayed geocaches
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {type: "extract_preview"}, function(result) {
			$.each(result, function(index, each) {
			$('main').append('<section class="card"><h1><strong>' + 
				each.geocache_id + '</strong></h1><h2>' + 
				each.geocache_title + '</h2></section>');
			});
		});
	});
});