var HudsonDownloader = Class.extend({
	download: function(callback, url, feed) {
		var request = new XMLHttpRequest();
	    request.open("GET", url, true);
		// TODO: basic auth
		//this.setBasicAuth(request);
	    request.onreadystatechange = function () {
	        if (request.readyState == 4) {
	            if (request.status == 200) {
	            	callback.process(request.responseText, feed);
	            	//alert('200' + request.responseText);
	            	//TODO
	                //aliasFeedMgr.parseHistoryFeed(feed, request.responseText);
	                //if (feed.hasExecutorFeed()) {
	                //	aliasFeedMgr.downloadExecutorFeed(feed.getExecutorFeed());
	                //}
	            }
	            else {
	            	alert('not 200');
	            	// TODO
	                //aliasUIMgr.setStatusDownloadError(feed);
	            }
	        }
	    };
	    request.onerror = function () {
	    	alert('onerror');
	    	// TODO
	        //aliasUIMgr.setStatusDownloadError(feed);
	    };
	    callback.setStatusDownloading(feed);
		request.send(null);
	}
});