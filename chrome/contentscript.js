var injectJs = function(command) {
	location.href = "javascript:try{" + command + "}catch(e){}; void 0";
}

var injectExtractor = function(fileName) {
	console.log('Injecting ' + fileName);
	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.src = chrome.extension.getURL(fileName);
	(document.head || document.documentElement).appendChild(s);
}

chrome.runtime.onMessage.addListener(function(message, sender) {
	if (message.type == 'inject_extractor') {
		injectJs('window.CC_EXTRACTOR.destroy()');
		injectExtractor(message.file);
	}
});

chrome.runtime.onMessage.addListener(function(message, sender) {
	if (message.type == 'extract_preview') {
		injectJs('window.CC_EXTRACTOR.extractPreview()');
	}
});

window.addEventListener("message", function(event) {
	// We only accept messages from ourselves
	if (event.source != window) return;
	if (event.data.type && (event.data.type == "extracted_preview")) {
		chrome.runtime.sendMessage({type: 'extracted_preview', data: event.data.data});
	}
}, false);