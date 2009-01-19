/*****************************************************************
 * FeedMgr takes care of asynchronous feed retrieval, and parses the XML feed.
 */
function FeedMgr(uiMgr, notificationMgr, prefMgr) {
	this.uiMgr = uiMgr;
	this.notificationMgr = notificationMgr;
	this.prefMgr = prefMgr;
}
FeedMgr.prototype.processAll = function(feeds) {
	for(var i = 0; i < feeds.length; i++) {
		if (!feeds[i].isIgnored()) {
			this.process(feeds[i]);
		}
	}
}
FeedMgr.prototype.process = function(feed) {
	this.downloadHistory(feed);
}
FeedMgr.prototype.downloadHistory = function(feed) {
	// TODO: figure out a better way for onreadystatechange and onerror to have visibilities to the managers.
	var aliasUIMgr = this.uiMgr;
	var aliasFeedMgr = this;
	
	var request = new XMLHttpRequest();
    request.open("GET", feed.getUrl(), true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                aliasFeedMgr.parseHistory(feed, request.responseText);
                if (feed.hasExecutor()) {
                	aliasFeedMgr.downloadExecutor(feed.getExecutor());
                }
            }
            else {
                aliasUIMgr.setStatusDownloadError(feed);
            }
        }
    };
    request.onerror = function () {
        aliasUIMgr.setStatusDownloadError(feed);
    };
	this.uiMgr.setStatusDownloading(feed);
	request.send(null);
}
FeedMgr.prototype.parseHistory = function(feed, responseText) {
    try {
        var xml = new DOMParser().parseFromString(responseText, "text/xml");
        var title = xml.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        var entries = xml.getElementsByTagName("entry");
        if (entries.length > 0) {
        	var hasNonSuccess = false;
        	var nonSuccessCount = 0;
        	var size = Math.min(this.prefMgr.getSize(), entries.length);
	        var builds = new Array(size);
	        for (var i = 0; i < size; i++) {
				var text = entries[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
				var link = entries[i].getElementsByTagName("link")[0].attributes.getNamedItem("href").value;
				var date = entries[i].getElementsByTagName("published")[0].childNodes[0].nodeValue;
				builds[i] = new HistoryBuild(text, link, date);
				if (!builds[i].isSuccess()) {
					hasNonSuccess = true;
					nonSuccessCount++;
					if (builds[i].isFailure()) {
						this.handleFailureNotification(feed, title, builds[i], date);
					}
				}
	        }
			var status;
			if (this.prefMgr.getFeedStatusType() == "latest") {
				status = builds[0].getStatus();
			} else {
				status = this.getHealthStatus(size, nonSuccessCount);
			}
			this.uiMgr.setStatusProcessed(feed, title, status, builds, responseText);
	    } else {
	    	this.uiMgr.setStatusNoBuild(feed, title);
	    }
    } catch (e) {
    	this.uiMgr.setStatusParseError(feed, e);
    }
}
FeedMgr.prototype.handleFailureNotification = function(feed, title, build, date) {
	var lastFail = this.prefMgr.getLastFail(feed);
	if (lastFail == null || lastFail == "" || lastFail < date) {
		this.prefMgr.setLastFail(feed, date);
		if (prefMgr.getSound()) {
			this.notificationMgr.playSound("failure");
		}
		if (prefMgr.getAlert()) {
			this.notificationMgr.displayAlert(feed, title, build);
		}
	}
}
FeedMgr.prototype.getHealthStatus = function(size, nonSuccessCount) {
	var status = null;
	var healthRate = (size - nonSuccessCount) * 100 / size;
	if (healthRate >= 80) {
		status = "health_80";
	} else if (healthRate >= 60) {
		status = "health_60";
	} else if (healthRate >= 40) {
		status = "health_40";
	} else if (healthRate >= 20) {
		status = "health_20";
	} else {
		status = "health_00";
	}
	return status;
}
FeedMgr.prototype.downloadExecutor = function(executor) {
	// TODO: figure out a better way for onreadystatechange and onerror to have visibilities to the managers.
	var aliasUIMgr = this.uiMgr;
	var aliasFeedMgr = this;
	
	var request = new XMLHttpRequest();
    request.open("GET", executor.getUrl(), true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
            	///alert("executor:" + request.responseText);
                ///aliasFeedMgr.parseHistory(feed, request.responseText);
            }
            else {
            	///executor dl error
                ///aliasUIMgr.setStatusDownloadError(executor);
            }
        }
    };
    request.onerror = function () {
    	///executor dl error
        ///aliasUIMgr.setStatusDownloadError(executor);
    };
    ///status dl error
	///this.uiMgr.setStatusDownloading(executor);
	request.send(null);
}
FeedMgr.prototype.parseExecutor = function(feed, responseText) {
    try {
        var xml = new DOMParser().parseFromString(responseText, "text/xml");
        /*
        var title = xml.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        var entries = xml.getElementsByTagName("entry");
        if (entries.length > 0) {
        	var hasNonSuccess = false;
        	var nonSuccessCount = 0;
        	var size = Math.min(this.prefMgr.getSize(), entries.length);
	        var builds = new Array(size);
	        for (var i = 0; i < size; i++) {
				var text = entries[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
				var link = entries[i].getElementsByTagName("link")[0].attributes.getNamedItem("href").value;
				var date = entries[i].getElementsByTagName("published")[0].childNodes[0].nodeValue;
				builds[i] = new HistoryBuild(text, link, date);
				if (!builds[i].isSuccess()) {
					hasNonSuccess = true;
					nonSuccessCount++;
					if (builds[i].isFailure()) {
						this.handleFailureNotification(feed, title, builds[i], date);
					}
				}
	        }
			var status;
			if (this.prefMgr.getFeedStatusType() == "latest") {
				status = builds[0].getStatus();
			} else {
				status = this.getHealthStatus(size, nonSuccessCount);
			}
			this.uiMgr.setStatusProcessed(feed, title, status, builds, responseText);
	    } else {
	    	this.uiMgr.setStatusNoBuild(feed, title);
	    }
	    */
    } catch (e) {
    	///this.uiMgr.setStatusParseError(feed, e);
    }
}