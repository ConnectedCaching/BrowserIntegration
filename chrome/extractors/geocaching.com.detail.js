window.CC_EXTRACTOR = {

	platformName: function() {
		return 'Geocaching.com'
	},

	targetAuthRequired: function() {
		return $('#hlSignIn').size() === 1;
	},

	targetAuthUrl: function() {
		if (this.targetAuthRequired()) {
			var gcCode = $('#ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode').text();
			return "https://www.geocaching.com/login/default.aspx?redir=%2fseek%2fcache_details.aspx%3fwp%3d" + gcCode;
		}
		return '';
	},

	extractPreview: function() {

		if (this.targetAuthRequired()) return [];

		var cache_id = $('#cache_oxcode').first().text();
		var cache_title = $('#geocache_name > h2 > div').first().text();

		return  [{
			geocache_id: cache_id,
			geocache_title: cache_title
		}];

	}

};