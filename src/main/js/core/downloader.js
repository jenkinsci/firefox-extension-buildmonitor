org_hudsonci.Downloader = name_edwards_dean_Base.extend({
	download: function(callback, url, feed, networkUsername, networkPassword) {
	    var request = new XMLHttpRequest();
	    
	    if (url && url.match(/^https?:\/\/.+:.+@.+/)) {
		var usernamePassword = url.match(/^https?:\/\/.+@/).toString()
			.replace(/^https?:\/\//, '').replace(/@$/, '').split(':');
		username = usernamePassword[0];
		password = usernamePassword[1];
		url = url.replace(/^https?:\/\/.*@/, (url.match(/^https/)) ? 'https://' : 'http://');
	    } else {
		username = networkUsername;
		password = networkPassword;
	    }
	    request.open("GET", url, true);
		if (username !== null && username !== '') {
			var auth = "Basic " + info_webtoolkit_Base64.encode(username + ':' + password);
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