/*
 *	This script will be executed in the scope of the web page,
 *	thus we have to use the jQuery version embedded there
 */

window.CC_EXTRACTOR = {

	extractPreview: function() {

		var cache_id = $j('#cache_oxcode').first().text();
		var cache_title = $j('#geocache_name > h2 > div').first().text();

		var result =  [{
			geocache_id: cache_id,
			geocache_title: cache_title
		}];

		window.postMessage({ type: "extracted_preview", data: result }, "*");

	},

	destroy: function() {
		console.log('Removing extractors');
		$j("script[src$=\'.cc.js\']").remove();
		delete window.CC_EXTRACTOR;
	}

};