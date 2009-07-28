var HudsonDownloader = Base.extend({
	download: function(callback, url, feed, networkUsername, networkPassword) {
		var request = new XMLHttpRequest();
	    request.open("GET", url, true);
		if (networkUsername != null && networkUsername != "") {
			var auth = "Basic " + Base64.encode(networkUsername + ':' + networkPassword);
			request.setRequestHeader("Authorization", auth);
		}
	    request.onreadystatechange = function () {
	        if (request.readyState == 4) {
	            if (request.status == 200) {
	            	callback.process(request.responseText, feed);
	            }
	            else {
	                callback.setStatusDownloadError(feed);
	            }
	        }
	    };
	    request.onerror = function () {
	        callback.setStatusDownloadError(feed);
	    };
	    callback.setStatusDownloading(feed);
		request.send(null);
	}
});