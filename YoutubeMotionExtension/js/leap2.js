chrome.storage.local.get("url", function(result) {
	if (typeof result.url != "undefined") {
		var searchBox = document.getElementById("inputtext")
		searchBox.value = result.url
	}

	chrome.storage.local.set({"url": ""}, function() {})
})