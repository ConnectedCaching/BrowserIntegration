var injectJs = function(command) {
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ command +')();'));
	(document.body || document.head || document.documentElement).appendChild(script);
}

var extractors = [];

var injectExtractor = function(fileName) {
	console.log('Injecting ' + fileName);

	// remove already injected extractors first
	//$.each(extractors, function(index, each) {
	//	document.removeChild(each);
	//});
	//extractors = [];

	// inject new extractor
	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.src = chrome.extension.getURL(fileName);
	//extractors.push(s);
	(document.head || document.documentElement).appendChild(s);
}

chrome.runtime.onMessage.addListener(function(message, sender) {
	if (message.type == 'inject_extractor') {
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