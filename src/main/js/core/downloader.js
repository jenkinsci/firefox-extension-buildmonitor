var HudsonDownloader = Class.extend({
	init: function(url,  caller) {
	alert(url + caller);
		this.url = url;
		this.caller = caller;
	},
	download: function() {
		var aliasCaller = this.caller;
		
		var request = new XMLHttpRequest();
	    request.open("GET", this.url, true);
		// TODO: basic auth
		//this.setBasicAuth(request);
	    request.onreadystatechange = function () {
	        if (request.readyState == 4) {
	            if (request.status == 200) {
	            	alert('200');
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
	    alert('downloading');
	    // TODO
		//this.uiMgr.setStatusDownloading(feed);
		request.send(null);
	}
});