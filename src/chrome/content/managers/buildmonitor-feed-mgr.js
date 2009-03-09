/*****************************************************************
 * HudsonFeedMgr takes care of asynchronous feed retrieval, and parses the XML feed.
 */
function HudsonFeedMgr(uiMgr, notificationMgr, prefMgr) {
	this.uiMgr = uiMgr;
	this.notificationMgr = notificationMgr;
	this.prefMgr = prefMgr;
}
HudsonFeedMgr.prototype.processAll = function(feeds) {
	for(var i = 0; i < feeds.length; i++) {
		if (!feeds[i].isIgnored()) {
			this.process(feeds[i]);
		}
	}
}
HudsonFeedMgr.prototype.process = function(feed) {
	this.downloadHistoryFeed(feed);
}
HudsonFeedMgr.prototype.downloadHistoryFeed = function(feed) {
	// TODO: figure out a better way for onreadystatechange and onerror to have visibilities to the managers.
	var aliasUIMgr = this.uiMgr;
	var aliasFeedMgr = this;
	
	var request = new XMLHttpRequest();
    request.open("GET", feed.getUrl(), true);
	this.setBasicAuth(request);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                aliasFeedMgr.parseHistoryFeed(feed, request.responseText);
                if (feed.hasExecutorFeed()) {
                	aliasFeedMgr.downloadExecutorFeed(feed.getExecutorFeed());
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
HudsonFeedMgr.prototype.parseHistoryFeed = function(feed, responseText) {
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
				builds[i] = new HudsonHistoryBuild(text, link, date);
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
HudsonFeedMgr.prototype.handleFailureNotification = function(feed, title, build, date) {
	var lastFail = this.prefMgr.getLastFail(feed);
	if (lastFail == null || lastFail == "" || lastFail < date) {
		this.prefMgr.setLastFail(feed, date);
		this.notificationMgr.playSound("failure");
		this.notificationMgr.displayAlert(feed, title, build);
	}
}
HudsonFeedMgr.prototype.getHealthStatus = function(size, nonSuccessCount) {
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
HudsonFeedMgr.prototype.downloadExecutorFeed = function(executorFeed) {
	// TODO: figure out a better way for onreadystatechange and onerror to have visibilities to the managers.
	var aliasUIMgr = this.uiMgr;
	var aliasFeedMgr = this;
	
	var request = new XMLHttpRequest();
    request.open("GET", executorFeed.getUrl(), true);
	this.setBasicAuth(request);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                aliasFeedMgr.parseExecutorFeed(executorFeed, request.responseText);
            }
            else {
                aliasUIMgr.setStatusDownloadError(executorFeed);
            }
        }
    };
    request.onerror = function () {
        aliasUIMgr.setStatusDownloadError(executorFeed);
    };
	this.uiMgr.setStatusDownloading(executorFeed);
	request.send(null);
}
HudsonFeedMgr.prototype.parseExecutorFeed = function(executorFeed, responseText) {
    try {
        var xml = new DOMParser().parseFromString(responseText, "text/xml");
        var computerElements = xml.getElementsByTagName("computer");
        var computers = new Array(computerElements.length);
        var title = "Hudson build executors";
        var status = "idle";
        for (var i = 0; i < computerElements.length; i++) {
        	var monitorData = computerElements[i].getElementsByTagName("monitorData")[0];

        	var spaceMonitor = monitorData.getElementsByTagName("hudson.node_monitors.SwapSpaceMonitor")[0];
			var availablePhysicalMemory = this.getElementValue(spaceMonitor, "availablePhysicalMemory");
			var availableSwapSpace = this.getElementValue(spaceMonitor, "availableSwapSpace");
			var totalPhysicalMemory = this.getElementValue(spaceMonitor, "totalPhysicalMemory");
			var totalSwapSpace = this.getElementValue(spaceMonitor, "totalSwapSpace");
			
			var architecture = this.getElementValue(monitorData, "hudson.node_monitors.ArchitectureMonitor");
			var averageResponseTime = this.getElementValue(monitorData, "hudson.node_monitors.ResponseTimeMonitor");
			var diskSpace = this.getElementValue(monitorData, "hudson.node_monitors.DiskSpaceMonitor");
        
        	var displayName = this.getElementValue(computerElements[i], "displayName");
        	var isIdle = this.getLastElementValue(computerElements[i], "idle");
        	var isOffline = this.getElementValue(computerElements[i], "offline");
        	
        	var monitorData = new HudsonMonitorData(availablePhysicalMemory, availableSwapSpace, totalPhysicalMemory, totalSwapSpace, architecture,	averageResponseTime, diskSpace);

        	var executorElements = computerElements[i].getElementsByTagName("executor");
        	var executors = new Array(executorElements.length);
        	for (var j = 0; j < executorElements.length; j++) {
        		var currentExecutable = executorElements[j].getElementsByTagName("currentExecutable")[0];
        		var executableNumber = this.getElementValue(currentExecutable, "number");
        		var executableUrl = this.getElementValue(currentExecutable, "url");
        		var isExecutorIdle = this.getElementValue(executorElements[j], "idle");
        		var isLikelyStuck = this.getElementValue(executorElements[j], "likelyStuck");
        		var number = j;
        		var progress = this.getElementValue(executorElements[j], "progress");
        		executors[j] = new HudsonExecutor(executableNumber, executableUrl, isExecutorIdle, isLikelyStuck, number, progress, displayName, executorFeed.getUrl().replace(/\/api\/xml.*/, ""), isOffline);
        		
        		if (isLikelyStuck == "true") {
        			status = "stuck";
			        this.notificationMgr.playSound("stuck");
					this.notificationMgr.displayAlert(executorFeed, title, executors[j]);
        		} else if (status != "stuck" && currentExecutable != null) {
        			status = "running";
        		}
        	}
        	
        	computers[i] = new HudsonComputer(displayName, new Boolean(isIdle), new Boolean(isOffline), monitorData, executors);
        }
        this.uiMgr.setExecutorFeedStatusProcessed(executorFeed, title, status, computers, responseText);
    } catch (e) {
    	this.uiMgr.setStatusParseError(executorFeed, e);
    }
}
HudsonFeedMgr.prototype.setBasicAuth = function(request) {
	var networkUsername = this.prefMgr.getNetworkUsername();
	var networkPassword = this.prefMgr.getNetworkPassword();
	if (networkUsername != null && networkUsername != "") {
		var auth = "Basic " + Base64.encode(networkUsername + ':' + networkPassword);
		request.setRequestHeader("Authorization", auth);
	}
}
HudsonFeedMgr.prototype.getElementValue = function(container, name) {
	var value = null;
	if (container != null && container.getElementsByTagName(name)[0] != null) {
		value = container.getElementsByTagName(name)[0].childNodes[0].nodeValue;
	}
	return value;
}
HudsonFeedMgr.prototype.getLastElementValue = function(container, name) {
	var value = null;
	if (container != null) {
		var elements = container.getElementsByTagName(name);
		if (elements != null) {
			value = elements[elements.length - 1].childNodes[0].nodeValue;
		}
	}
	return value;
}