/*
 *	This script will be executed in the scope of the web page,
 *	thus we have to use the jQuery version embedded there
 */

window.CC_EXTRACTOR = {

	extractPreview: function() {

		var result = [];
		var caches = $j('.result');

		$j.each(caches, function(index, each) {
			var cache_title = $j(each).children().filter('.gc-title').text();
			var cache_id = $j(each).attr('id').split('_').last();
			
			result.push({
				geocache_id: cache_id,
				geocache_title: cache_title
			});
		});

		window.postMessage({ type: "extracted_preview", data: result }, "*");

	},

	destroy: function() {
		console.log('Removing extractors');
		$j("script[src$=\'.cc.js\']").remove();
		delete window.CC_EXTRACTOR;
	}

};