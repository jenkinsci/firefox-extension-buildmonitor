var HudsonDownloader = Class.extend({
	setCaller: function(caller) {
		this.caller = caller;
	},
	download: function(feed) {
		var aliasCaller = this.caller;

		var request = new XMLHttpRequest();
	    request.open("GET", feed.getUrl(), true);
		// TODO: basic auth
		//this.setBasicAuth(request);
	    request.onreadystatechange = function () {
	        if (request.readyState == 4) {
	            if (request.status == 200) {
	            	aliasCaller.process(request.responseText, feed);
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
	    this.caller.setStatusDownloading(feed);
		request.send(null);
	}
});