/*
 * UIMgr is responsible for updating user interface components.
 */
function UIMgr(logMgr) {
	this.logMgr = logMgr;
}
UIMgr.prototype.setPanelIcon = function(status) {
    this.logMgr.debug("Setting panel icon. status: " + status);
    document.getElementById("buildmonitor-panel").setAttribute("src", "chrome://buildmonitor/skin/" + status + ".png");
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
		} else {
		    text = items[i];
		}
	    itemLabel.setAttribute("value", text);
	   	itemLabel.setAttribute("class", this.getStatus(text));
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
}
UIMgr.prototype.getStatus = function(value) {
	var status = "";
	if (value.indexOf("SUCCESS") >= 0) {
		status = "success";
	} else if (value.indexOf("FAILURE") >= 0 || value.indexOf("NOT_BUILT") >= 0 || value.indexOf("UNSTABLE") >= 0) {
		status = "failure";
	}
	return status;
}

/*
 * FeedMgr takes care of asynchronous feed retrieval, and parses the XML feed.
 */
function FeedMgr(prefMgr, logMgr, uiMgr) {
	this.prefMgr = prefMgr;
	this.logMgr = logMgr;
	this.uiMgr = uiMgr;

}
FeedMgr.prototype.process = function(url) {
	// TODO: figure out a better way for onreadystatechange and onerror to have visibilities to the managers.
	var aliasPrefMgr = this.prefMgr;
	var aliasLogMgr = this.logMgr;
	var aliasUIMgr = this.uiMgr;
	var aliasFeedMgr = this;
	var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                aliasLogMgr.debug("Successfully retrieved feed. responseText: " + request.responseText.substring(0, 20) + "...");
                aliasFeedMgr.parse(request.responseText);
            }
            else {
                aliasLogMgr.debug("Failed to retrieve feed.");
                aliasUIMgr.reset();
				aliasUIMgr.setTooltipContent("Error", new Array("An error occured while retrieving feed.", "Please check the feed URL via Preferences menu."));
                aliasUIMgr.setPanelIcon("error");
            }
        }
    };
    request.onerror = function () {
        aliasLogMgr.debug("Failed to retrieve feed.");
        aliasUIMgr.reset();
		aliasUIMgr.setTooltipContent("Error", new Array("An error occured while retrieving feed.", "Please check the feed URL via Preferences menu."));
        aliasUIMgr.setPanelIcon("error");
    };
    this.uiMgr.reset();
    this.uiMgr.setTooltipContent("Loading", new Array("Retrieving feed. url: " + url, "Speed varies depending on network connection and feed size."));
    this.uiMgr.setPanelIcon("processing");
    request.send(null);
}
FeedMgr.prototype.parse = function(text) {
    try {
        var xml = new DOMParser().parseFromString(text,"text/xml");
        var title = xml.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        var entries = xml.getElementsByTagName("entry");
        if (entries.length > 0) {
        	var hasFailure = false;
        	var size = Math.min(this.prefMgr.getSize(), entries.length);
	        var buildDetails = new Array(size);
	        for (var i = 0; i < size; i++) {
				var text = entries[i].getElementsByTagName("title")[0].childNodes[0].nodeValue + " - "
						+ prettyDateUTC(entries[i].getElementsByTagName("published")[0].childNodes[0].nodeValue);
				var link = entries[i].getElementsByTagName("link")[0].attributes.getNamedItem("href").value;
				buildDetails[i] = new BuildDetail(text, link);
				if (buildDetails[i].getText().indexOf("FAILURE") >= 0) {
					hasFailure = true;
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
			this.uiMgr.setPanelIcon(panelIcon);
	    } else {
	    	this.uiMgr.reset();
	    	this.uiMgr.setTooltipContent(title, new Array("No build status found."));
	    	this.uiMgr.setPanelIcon("unknown");
	    }
    } catch (e) {
    	var message = "An unexpected error has occured while parsing response text.";
        this.logMgr.debug(message + " Exception: " + e);
        this.uiMgr.reset();
		this.uiMgr.setTooltipContent("Error", new Array(message, " Please enable debug and check the log via Error Console."));
        this.uiMgr.setPanelIcon("error");
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