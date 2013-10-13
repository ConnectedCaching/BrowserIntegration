var injectJs = function(command) {
	location.href = "javascript:try{" + command + "}catch(e){}; void 0";
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResult) {
	
	var extractor = window.CC_EXTRACTOR;

	if (message.type == 'extract_preview') {
		sendResult(extractor.extractPreview());
	}

	if (message.type == 'target_auth_check') {
		sendResult({
			authRequired: extractor.targetAuthRequired(),
			platformName: extractor.platformName(),
			targetAuthUrl: extractor.targetAuthUrl()
		});
	}

});