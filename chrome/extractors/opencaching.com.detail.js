window.CC_EXTRACTOR = {

	extractPreview: function() {

		var cache_id = $('#cache_oxcode').first().text();
		var cache_title = $('#geocache_name > h2 > div').first().text();

		return  [{
			geocache_id: cache_id,
			geocache_title: cache_title
		}];

	}

};