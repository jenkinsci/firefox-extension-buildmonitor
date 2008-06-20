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
UIMgr.prototype.setPanelIcon = function(status) {
    this.logMgr.debug(textMgr.get("ui.setpanelicon") + " status: " + status);
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
                aliasUIMgr.setPanelIcon("error");
            }
        }
    };
    request.onerror = function () {
        aliasLogMgr.debug(aliasTextMgr.get("feed.process.error"));
        aliasUIMgr.reset();
		aliasUIMgr.setTooltipContent(aliasTextMgr.get("feed.process.error.title"), new Array(aliasTextMgr.get("feed.process.error.message1"), aliasTextMgr.get("feed.process.error.message2")));
        aliasUIMgr.setPanelIcon("error");
    };
    this.uiMgr.reset();
    this.uiMgr.setTooltipContent(this.textMgr.get("feed.process.loading.title"), new Array(this.textMgr.get("feed.process.loading.message1") + " url: " + url, this.textMgr.get("feed.process.loading.message2")));
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
						+ prettyDateUTC(entries[i].getElementsByTagName("published")[0].childNodes[0].nodeValue, this.textMgr);
				var link = entries[i].getElementsByTagName("link")[0].attributes.getNamedItem("href").value;
				buildDetails[i] = new BuildDetail(text, link);
				if (buildDetails[i].getText().indexOf("SUCCESS") == -1) {
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
	    	this.uiMgr.setTooltipContent(title, new Array(this.textMgr.get("feed.nobuild")));
	    	this.uiMgr.setPanelIcon("unknown");
	    }
    } catch (e) {
    	var message = this.textMgr.get("feed.exception.message1");
        this.logMgr.debug(message + " Exception: " + e);
        this.uiMgr.reset();
		this.uiMgr.setTooltipContent(this.textMgr.get("feed.exception.title"), new Array(message, this.textMgr.get("feed.exception.message2")));
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