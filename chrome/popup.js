// display a warning that the user has to sign in to her CC account
function displayLoginWarning() {
	$('main').prepend('<section class="card"><h1><strong class="warning">Sign In Required</strong></h1><h2>' + 
		'Please <a href="#" class="warning">sign in</a> to your Connected Caching account!</h2></section>');
}

// display a warning that the user has to sign in to the target site
function displayPlatformAuthWarning(platformName, authUrl) {
	$('main').prepend('<section class="card"><h1><strong class="warning">Sign In Required</strong></h1><h2>' + 
		'Please <a href="#" class="warning" id="platformSignIn">sign in</a> to your ' + platformName + ' account!</h2></section>');
	$('#platformSignIn').on('click', function() {
		chrome.tabs.update({url: authUrl});
		window.close();
	});
}

document.addEventListener('DOMContentLoaded', function () {

	// check if sign in to target site is required
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {type: "platform_auth_check"}, function(result) {
			if (result.platformAuthRequired) displayPlatformAuthWarning(result.platformName, result.platformAuthUrl);
		});
	});

	// check if user is signed in to Connected Caching
	chrome.cookies.get({url: 'http://localhost/*', name: 'authToken'}, function(cookie) {
		if (cookie == null) displayLoginWarning();
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