var injectJs = function(command) {
	location.href = "javascript:try{" + command + "}catch(e){}; void 0";
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResult) {
	if (message.type == 'extract_preview') {
		sendResult(window.CC_EXTRACTOR.extractPreview());
	}
});