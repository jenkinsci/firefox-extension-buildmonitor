var HudsonDownloader = Class.extend({
	setCaller: function(callback) {
		this.callback = callback;
	},
	download: function(feed) {
		var aliasCallback = this.callback;

		var request = new XMLHttpRequest();
	    request.open("GET", feed.getUrl(), true);
		// TODO: basic auth
		//this.setBasicAuth(request);
	    request.onreadystatechange = function () {
	        if (request.readyState == 4) {
	            if (request.status == 200) {
	            	aliasCallback.process(request.responseText, feed);
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
	    this.callback.setStatusDownloading(feed);
		request.send(null);
	}
});