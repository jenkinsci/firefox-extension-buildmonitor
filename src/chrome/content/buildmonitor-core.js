/*
 * TextMgr retrieves text from string bundle.
 */
function TextMgr() {
}
TextMgr.prototype.get = function(key, args) {
	var texts = document.getElementById("buildmonitor-stringbundle");
	var text;
	if (args) {
		text = texts.getFormattedString(key, args);
	} else {
		text = texts.getString(key);
	}
	return text;
}

/*
 * UIMgr is responsible for updating user interface components.
 */
function UIMgr(logMgr, textMgr) {
	this.logMgr = logMgr;
	this.textMgr = textMgr;
}
UIMgr.prototype.setStatusPanel = function(historyStatus, historyCount) {
    this.logMgr.debug(textMgr.get("ui.setstatuspanel") + " history status: " + historyStatus + ", history count: " + historyCount);
    var historyPanel = document.getElementById("buildmonitor-panel-history");
    historyPanel.setAttribute("src", "chrome://buildmonitor/skin/" + historyStatus + ".png");
    //if (historyCount && historyCount > 0) {
	//    historyPanel.setAttribute("label", historyCount);
	//}
}
UIMgr.prototype.setTooltipContent = function(title, items) {
	var box = document.getElementById("buildmonitor-box");
	if (title) {
		var titleLabel = document.createElement("label");
		titleLabel.setAttribute("value", title);
		titleLabel.setAttribute("class", "title");
		box.appendChild(titleLabel);
	}
	for (i = 0; i < items.length; i++) {
		var itemLabel = document.createElement("label");
		var text;
		if (typeof items[i] == "object") {
		    text = items[i].getText();
		    itemLabel.setAttribute("class", items[i].getStatus());
		} else {
		    text = items[i];
		}
	    itemLabel.setAttribute("value", text);
	   	box.appendChild(itemLabel);
	}
	var tooltip = document.getElementById("buildmonitor-tooltip");
	tooltip.appendChild(box);
}
UIMgr.prototype.setBuildsMenuContent = function(buildDetails) {
	var menu = document.getElementById("buildmonitor-builds");
	for (i = 0; i < buildDetails.length; i++) {
		var item = document.createElement("menuitem");
	    item.setAttribute("label", buildDetails[i].getText());
	   	item.setAttribute("value", buildDetails[i].getLink());
	   	item.setAttribute("oncommand", "getBrowser().addTab(this.value)");
	   	item.setAttribute("class", "menuitem-iconic");
	   	item.setAttribute("image", "chrome://buildmonitor/skin/" + buildDetails[i].getStatus() + ".png");
	   	item.setAttribute("maxwidth", "1000");
	   	menu.appendChild(item);
	}
}
UIMgr.prototype.reset = function() {
	var tooltipBox = document.getElementById("buildmonitor-box");
	while (tooltipBox.firstChild) {
		tooltipBox.removeChild(tooltipBox.firstChild);
	}
	var menu = document.getElementById("buildmonitor-builds");
	while (menu.firstChild) {
		menu.removeChild(menu.firstChild);
	}
	document.getElementById("buildmonitor-panel-history").setAttribute("label", null);
}

/*
 * FeedMgr takes care of asynchronous feed retrieval, and parses the XML feed.
 */
function FeedMgr(prefMgr, logMgr, uiMgr, textMgr) {
	this.prefMgr = prefMgr;
	this.logMgr = logMgr;
	this.uiMgr = uiMgr;
	this.textMgr = textMgr;

}
FeedMgr.prototype.process = function(url) {
	// TODO: figure out a better way for onreadystatechange and onerror to have visibilities to the managers.
	var aliasPrefMgr = this.prefMgr;
	var aliasLogMgr = this.logMgr;
	var aliasUIMgr = this.uiMgr;
	var aliasTextMgr = this.textMgr;
	var aliasFeedMgr = this;
	var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                aliasLogMgr.debug(aliasTextMgr.get("feed.process.ready.success") + " responseText: " + request.responseText.substring(0, 20) + "...");
                aliasFeedMgr.parse(request.responseText);
            }
            else {
                aliasLogMgr.debug(aliasTextMgr.get("feed.process.ready.failure"));
                aliasUIMgr.reset();
				aliasUIMgr.setTooltipContent(aliasTextMgr.get("feed.process.ready.failure.title"), new Array(aliasTextMgr.get("feed.process.ready.failure.message1"), aliasTextMgr.get("feed.process.ready.failure.message2")));
                aliasUIMgr.setStatusPanel("error");
            }
        }
    };
    request.onerror = function () {
        aliasLogMgr.debug(aliasTextMgr.get("feed.process.error"));
        aliasUIMgr.reset();
		aliasUIMgr.setTooltipContent(aliasTextMgr.get("feed.process.error.title"), new Array(aliasTextMgr.get("feed.process.error.message1"), aliasTextMgr.get("feed.process.error.message2")));
        aliasUIMgr.setStatusPanel("error");
    };
    this.uiMgr.reset();
    this.uiMgr.setTooltipContent(this.textMgr.get("feed.process.loading.title"), new Array(this.textMgr.get("feed.process.loading.message1") + " url: " + url, this.textMgr.get("feed.process.loading.message2")));
    this.uiMgr.setStatusPanel("processing");
    request.send(null);
}
FeedMgr.prototype.parse = function(text) {
    try {
        var xml = new DOMParser().parseFromString(text,"text/xml");
        var title = xml.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        var entries = xml.getElementsByTagName("entry");
        if (entries.length > 0) {
        	var hasFailure = false;
        	var failureCount = 0;
        	var size = Math.min(this.prefMgr.getSize(), entries.length);
	        var buildDetails = new Array(size);
	        for (var i = 0; i < size; i++) {
				var text = entries[i].getElementsByTagName("title")[0].childNodes[0].nodeValue + " - "
						+ prettyDateUTC(entries[i].getElementsByTagName("published")[0].childNodes[0].nodeValue, this.textMgr);
				var link = entries[i].getElementsByTagName("link")[0].attributes.getNamedItem("href").value;
				buildDetails[i] = new BuildDetail(text, link);
				if (buildDetails[i].getText().indexOf("SUCCESS") == -1) {
					hasFailure = true;
					failureCount = failureCount + 1;
				}
	        }
	        this.uiMgr.reset();
	        this.uiMgr.setTooltipContent(title, buildDetails);
	        this.uiMgr.setBuildsMenuContent(buildDetails);

	        var panelIcon = "success";
			if (buildDetails[0].getText().indexOf("SUCCESS") == -1) {
				panelIcon = "failure";
			} else if (hasFailure) {
				panelIcon = "warning";
			}
			this.uiMgr.setStatusPanel(panelIcon, failureCount);
	    } else {
	    	this.uiMgr.reset();
	    	this.uiMgr.setTooltipContent(title, new Array(this.textMgr.get("feed.nobuild")));
	    	this.uiMgr.setStatusPanel("unknown");
	    }
    } catch (e) {
    	var message = this.textMgr.get("feed.exception.message1");
        this.logMgr.debug(message + " Exception: " + e);
        this.uiMgr.reset();
		this.uiMgr.setTooltipContent(this.textMgr.get("feed.exception.title"), new Array(message, this.textMgr.get("feed.exception.message2")));
        this.uiMgr.setStatusPanel("error");
    }
}

/*
 * BuildDetail holds information of a particular build.
 */
function BuildDetail(text, link) {
	this.text = text;
	this.link = link;
}
BuildDetail.prototype.getText = function() {
    return this.text;
}
BuildDetail.prototype.getLink = function() {
    return this.link;
}
BuildDetail.prototype.getStatus = function() {
	var status = "";
	if (this.text.indexOf("SUCCESS") >= 0) {
		status = "success";
	} else if (this.text.indexOf("FAILURE") >= 0) {
		status = "failure";
	} else if (this.text.indexOf("ABORTED") >= 0 || this.text.indexOf("NOT_BUILT") >= 0) {
		status = "unknown";
	} else if (this.text.indexOf("UNSTABLE") >= 0) {
		status = "warning";
	}
	return status;
}