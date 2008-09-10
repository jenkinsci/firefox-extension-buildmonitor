/*****************************************************************
 * UIMgr is responsible for updating user interface components.
 */
function UIMgr(logMgr, textMgr) {
	this.logMgr = logMgr;
	this.textMgr = textMgr;
}
UIMgr.prototype.initFeedsPanel = function(feeds) {
	
	var feedsPanel = document.getElementById("hudson-panel-feeds");
	var feedsTooltip = document.getElementById("hudson-tooltip-feeds");
	var feedsBuildsMenupopup = document.getElementById("hudson-menupopup-builds-feeds");
	var feedsPrefsMenupopup = document.getElementById("hudson-menupopup-prefs-feeds");
	
	this.clear(feedsPanel);
	this.clear(feedsTooltip);
	this.clear(feedsBuildsMenupopup);
	this.clear(feedsPrefsMenupopup);
	
    for(var i = 0; i < feeds.length; i++) {

		var prefsMenupopup = document.createElement("menupopup");
		prefsMenupopup.setAttribute("id", this.getPrefsMenupopupId(feeds[i]));
		prefsMenupopup.setAttribute("class", "info");
		feedsPrefsMenupopup.appendChild(prefsMenupopup);
		
		var buildsMenupopup = document.createElement("menupopup");
		buildsMenupopup.setAttribute("id", this.getBuildsMenupopupId(feeds[i]));
		feedsBuildsMenupopup.appendChild(buildsMenupopup);
		
		var tooltip = document.createElement("tooltip");
		tooltip.setAttribute("id", this.getTooltipId(feeds[i]));
		tooltip.setAttribute("class", "info");
		tooltip.setAttribute("noautohide", "true");
		tooltip.setAttribute("maxwidth", "1000");
		feedsTooltip.appendChild(tooltip);
				
		var panel = document.createElement("statusbarpanel");
		panel.setAttribute("id", this.getPanelId(feeds[i]));
		panel.setAttribute("class", "statusbarpanel-iconic-text");
		panel.setAttribute("label", feeds[i].getCode());
		panel.setAttribute("popup", "buildmonitor-builds");
		panel.setAttribute("context", "buildmonitor-menu");
		panel.setAttribute("tooltip", "buildmonitor-tooltip");
		feedsPanel.appendChild(panel);
		this.setStatusQueued(feeds[i]);
    }
}
UIMgr.prototype.setStatusQueued = function(feed) {
	this.setPanel("queued", feed);
	this.setTooltip(new Array(textMgr.get("feed.queued.message1") + " url: " + feed.getUrl()), textMgr.get("feed.queued.title"), feed);
}
UIMgr.prototype.setStatusDownloading = function(feed) {
	this.setPanel("downloading", feed);
	this.setTooltip(new Array(textMgr.get("feed.process.downloading.message1") + " url: " + feed.getUrl(), textMgr.get("feed.process.downloading.message2")), textMgr.get("feed.process.downloading.title"), feed);
}
UIMgr.prototype.setStatusDownloadError = function(feed) {
	logMgr.debug(textMgr.get("feed.process.error"), feed);
	this.setPanel("error", feed);
	this.setTooltip(new Array(textMgr.get("feed.process.error.message1"), textMgr.get("feed.process.error.message2")), textMgr.get("feed.process.error.title"), feed);
}
UIMgr.prototype.setStatusParseError = function(feed, exception) {
	var message = this.textMgr.get("feed.exception.message1");
	logMgr.debug(message + " Exception: " + e);
	this.setPanel("error", feed);
	this.setTooltip(new Array(message, this.textMgr.get("feed.exception.message2")), this.textMgr.get("feed.exception.title"), feed);
}
UIMgr.prototype.setStatusNoBuild = function(feed, title) {
	this.setPanel("unknown", feed);
	this.setTooltip(new Array(this.textMgr.get("feed.nobuild")), title, feed);
}
UIMgr.prototype.setStatusProcessed = function(feed, title, status, builds, responseText) {
	logMgr.debug(textMgr.get("feed.process.ready.success") + " responseText: " + responseText.substring(0, 20) + "...", feed);
	this.setPanel(status, feed);
	this.setTooltip(builds, title, feed);
	this.setBuildsMenupopup(builds, title, feed);
}
UIMgr.prototype.setPanel = function(status, feed) {
	this.getPanelElement(feed).setAttribute("src", "chrome://buildmonitor/skin/" + status + ".png");
}
UIMgr.prototype.setTooltip = function(items, title, feed) {
	var vbox = document.createElement("vbox");
	if (title) {
		var titleLabel = document.createElement("label");
		titleLabel.setAttribute("value", title);
		titleLabel.setAttribute("class", "title");
		vbox.appendChild(titleLabel);
	}
	
	for (i = 0; i < items.length; i++) {
		var itemLabel = document.createElement("label");
		var text;
		if (typeof items[i] == "object") {
		    text = items[i].getDetails();
		    itemLabel.setAttribute("class", items[i].getStatus());
		} else {
		    text = items[i];
		}
	    itemLabel.setAttribute("value", text);
	   	vbox.appendChild(itemLabel);
	}
	
	var tooltip = this.getTooltipElement(feed);
	this.clear(tooltip);
	tooltip.appendChild(vbox);
	
	this.getPanelElement(feed).setAttribute("tooltip", this.getTooltipId(feed));
}
UIMgr.prototype.setBuildsMenupopup = function(builds, title, feed) {
	var menupopup = this.getBuildsMenupopupElement(feed);
	for (i = 0; i < builds.length; i++) {
		var menuitem = document.createElement("menuitem");
	    menuitem.setAttribute("label", builds[i].getDetails());
	   	menuitem.setAttribute("value", builds[i].getLink());
	   	menuitem.setAttribute("oncommand", "getBrowser().addTab(this.value)");
	   	menuitem.setAttribute("class", "menuitem-iconic");
	   	menuitem.setAttribute("image", "chrome://buildmonitor/skin/" + builds[i].getStatus() + ".png");
	   	menuitem.setAttribute("maxwidth", "1000");
	   	menupopup.appendChild(menuitem);
	}
	this.getPanelElement(feed).setAttribute("popup", this.getBuildsMenupopupId(feed));
}
UIMgr.prototype.getPanelElement = function(feed) {
	return document.getElementById(this.getPanelId(feed));
}
UIMgr.prototype.getPanelId = function(feed) {
	return "hudson-panel-" + this.getFeedId(feed);
}
UIMgr.prototype.getTooltipElement = function(feed) {
	return document.getElementById(this.getTooltipId(feed));
}
UIMgr.prototype.getTooltipId = function(feed) {
	return "hudson-tooltip-" + this.getFeedId(feed);
}
UIMgr.prototype.getBuildsMenupopupElement = function(feed) {
	return document.getElementById(this.getBuildsMenupopupId(feed));
}
UIMgr.prototype.getBuildsMenupopupId = function(feed) {
	return "hudson-menupopup-builds-" + this.getFeedId(feed);
}
UIMgr.prototype.getPrefsMenupopupElement = function(feed) {
	return document.getElementById(this.getPrefsMenupopupId(feed));
}
UIMgr.prototype.getPrefsMenupopupId = function(feed) {
	return "hudson-menupopup-prefs-" + this.getFeedId(feed);
}
UIMgr.prototype.getFeedId = function(feed) {
	var id = "main";
	if (feed) {
		id = "feed-" + feed.getId();
	}
	return id;
}
UIMgr.prototype.clear = function(elem) {
	while (elem.firstChild) {
		elem.removeChild(elem.firstChild);
	}
}

/*****************************************************************
 * FeedMgr takes care of asynchronous feed retrieval, and parses the XML feed.
 */
function FeedMgr(uiMgr, prefMgr) {
	this.uiMgr = uiMgr;
	this.prefMgr = prefMgr;
}
FeedMgr.prototype.process = function(feeds) {
	for(var i = 0; i < feeds.length; i++) {
		feedMgr.downloadHistory(feeds[i]);
	}
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
        	var hasFailure = false;
        	var size = Math.min(this.prefMgr.getSize(), entries.length);
	        var builds = new Array(size);
	        for (var i = 0; i < size; i++) {
				var text = entries[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
				var link = entries[i].getElementsByTagName("link")[0].attributes.getNamedItem("href").value;
				var date = entries[i].getElementsByTagName("published")[0].childNodes[0].nodeValue;
				builds[i] = new HistoryBuild(text, link, date);
				if (!builds[i].isSuccess()) {
					hasFailure = true;
				}
	        }
	        var status = "success";
			if (!builds[0].isSuccess()) {
				status = "failure";
			} else if (hasFailure) {
				status = "warning";
			}
			this.uiMgr.setStatusProcessed(feed, title, status, builds, responseText);
	    } else {
	    	this.uiMgr.setStatusNoBuild(feed, title);
	    }
    } catch (e) {
    	this.uiMgr.setStatusParseError(feed, e);
    }
}