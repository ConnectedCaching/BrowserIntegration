window.CC_EXTRACTOR = {
	
	platformName: function() {
		return 'Opencaching.com'
	},

	platformAuthRequired: function() {
		return false;
	},

	platformAuthUrl: function() {
		return '';
	},
	
	extractPreview: function() {

		var result = [];
		var caches = $('.result');

		$.each(caches, function(index, each) {
			var cache_title = $(each).children().filter('.gc-title').text();
			var cache_id = $(each).attr('id').split('_').pop();
			
			result.push({
				geocache_id: cache_id,
				geocache_title: cache_title
			});
		});

		return result;

	}

};