/*****************************************************************
 * UIMgr is responsible for updating user interface components.
 */
function UIMgr(logMgr, textMgr, prefMgr) {
	this.logMgr = logMgr;
	this.textMgr = textMgr;
	this.prefMgr = prefMgr;
}
UIMgr.prototype.initFeedsPanel = function(feeds) {

	this.feedsPanel = document.getElementById("hudson-panel-feeds");
	this.feedsTooltip = document.getElementById("hudson-tooltip-feeds");
	this.feedsBuildsMenupopup = document.getElementById("hudson-menupopup-builds-feeds");
	this.feedsPrefsMenupopup = document.getElementById("hudson-menupopup-menus-feeds");
		
	this.clear(this.feedsPanel);
	this.clear(this.feedsTooltip);
	this.clear(this.feedsBuildsMenupopup);
	this.clear(this.feedsPrefsMenupopup);

    for(var i = 0; i < feeds.length; i++) {
    	if (!feeds[i].isIgnored()) {
			if (feeds[i].hasComputerSet()) {
				this.addComputerSetPanel(feeds[i].getComputerSet());
			}
			this.addFeedPanel(feeds[i]);
		}
    }
}
UIMgr.prototype.addFeedPanel = function(feed) {

	var prefsMenupopup = document.createElement("menupopup");
	prefsMenupopup.setAttribute("id", this.getMenusMenupopupId(feed));
	this.feedsPrefsMenupopup.appendChild(prefsMenupopup);
	
	var buildsMenupopup = document.createElement("menupopup");
	buildsMenupopup.setAttribute("id", this.getBuildsMenupopupId(feed));
	buildsMenupopup.setAttribute("class", "info");
	this.feedsBuildsMenupopup.appendChild(buildsMenupopup);
	
	var tooltip = document.createElement("tooltip");
	tooltip.setAttribute("id", this.getTooltipId(feed));
	tooltip.setAttribute("class", "info");
	tooltip.setAttribute("noautohide", "true");
	tooltip.setAttribute("maxwidth", "1000");
	this.feedsTooltip.appendChild(tooltip);
			
	var panel = document.createElement("statusbarpanel");
	panel.setAttribute("id", this.getPanelId(feed));
	panel.setAttribute("class", "statusbarpanel-iconic-text");
	if (!this.prefMgr.getHideName()) {
		panel.setAttribute("label", feed.getName());
	}
	panel.setAttribute("popup", "buildmonitor-builds");
	panel.setAttribute("context", "buildmonitor-menu");
	panel.setAttribute("tooltip", "buildmonitor-tooltip");
	
	this.feedsPanel.appendChild(panel);
	this.setStatusQueued(feed);
	
	this.setPrefsMenupopup(feed);
}
UIMgr.prototype.addComputerSetPanel = function(computerSet) {
	var panel = document.createElement("statusbarpanel");
	panel.setAttribute("id", this.getPanelId(computerSet));
	panel.setAttribute("class", "statusbarpanel-iconic");
	
	this.feedsPanel.appendChild(panel);
	this.setPanel("running", computerSet);
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
UIMgr.prototype.setPanel = function(status, component) {
	this.getPanelElement(component).setAttribute("src", "chrome://buildmonitor/skin/" + this.getVisualStatus(status) + ".png");
}
UIMgr.prototype.setTooltip = function(items, title, feed) {
	var vbox = document.createElement("vbox");
	if (title) {
		var titleLabel = document.createElement("label");
		if (feed) {
			title += " [" + feed.getName() + "]";
		}
		titleLabel.setAttribute("value", title);
		titleLabel.setAttribute("class", "title");
		vbox.appendChild(titleLabel);
	}
	
	for (i = 0; i < items.length; i++) {
		var itemLabel = document.createElement("label");
		var text;
		if (typeof items[i] == "object") {
		    text = items[i].getDetails();
		    itemLabel.setAttribute("class", this.getVisualStatus(items[i].getStatus()));
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
	this.clear(menupopup);
	for (i = 0; i < builds.length; i++) {
		var menuitem = document.createElement("menuitem");
	    menuitem.setAttribute("label", builds[i].getDetails());
	   	menuitem.setAttribute("value", builds[i].getLink());
	   	menuitem.setAttribute("oncommand", "hudson_goTo(this.value)");
	   	menuitem.setAttribute("class", "menuitem-iconic");
	   	menuitem.setAttribute("image", "chrome://buildmonitor/skin/" + this.getVisualStatus(builds[i].getStatus()) + ".png");
	   	menuitem.setAttribute("maxwidth", "1000");
	   	menupopup.appendChild(menuitem);
	}
	this.getPanelElement(feed).setAttribute("popup", this.getBuildsMenupopupId(feed));
}
UIMgr.prototype.setPrefsMenupopup = function(feed) {
	var menupopup = this.getMenusMenupopupElement(feed);

	var preferencesMenuItem = document.createElement("menuitem");
	preferencesMenuItem.setAttribute("label", textMgr.get("menu.preferences"));
	preferencesMenuItem.setAttribute("oncommand", "hudson_openPreferences();");
	preferencesMenuItem.setAttribute("class", "menuitem-iconic");
	preferencesMenuItem.setAttribute("image", "chrome://buildmonitor/skin/preferences.png");
	menupopup.appendChild(preferencesMenuItem);
	
	var refreshAllMenuitem = document.createElement("menuitem");
	refreshAllMenuitem.setAttribute("label", textMgr.get("menu.refresh.all"));
	refreshAllMenuitem.setAttribute("oncommand", "hudson_run();");
	refreshAllMenuitem.setAttribute("class", "menuitem-iconic");
	refreshAllMenuitem.setAttribute("image", "chrome://buildmonitor/skin/refreshall.png");
	menupopup.appendChild(refreshAllMenuitem);
	
	menupopup.appendChild(document.createElement("menuseparator"));

	var removeMenuItem = document.createElement("menuitem");
	removeMenuItem.setAttribute("label", textMgr.get("menu.remove") + " [" + feed.getName() + "]");
	removeMenuItem.setAttribute("oncommand", "hudson_removeFeed(" + feed.getId() + ");");
	removeMenuItem.setAttribute("class", "menuitem-iconic");
	removeMenuItem.setAttribute("image", "chrome://buildmonitor/skin/remove.png");
	menupopup.appendChild(removeMenuItem);
	
	var dashboardMenuItem = document.createElement("menuitem");
	dashboardMenuItem.setAttribute("label", textMgr.get("menu.dashboard") + " [" + feed.getName() + "]");
	dashboardMenuItem.setAttribute("oncommand", "hudson_goToDashboard(" + feed.getId() + ");");
	dashboardMenuItem.setAttribute("class", "menuitem-iconic");
	dashboardMenuItem.setAttribute("image", "chrome://buildmonitor/skin/dashboard.png");
	menupopup.appendChild(dashboardMenuItem);
	
	if (feed.isJob()) {
		var buildMenuItem = document.createElement("menuitem");
		buildMenuItem.setAttribute("label", textMgr.get("menu.build") + " [" + feed.getName() + "]");
		buildMenuItem.setAttribute("oncommand", "hudson_build(" + feed.getId() + ");");
		buildMenuItem.setAttribute("class", "menuitem-iconic");
		buildMenuItem.setAttribute("image", "chrome://buildmonitor/skin/build.png");
		menupopup.appendChild(buildMenuItem);
	}
			
	var refreshMenuitem = document.createElement("menuitem");
	refreshMenuitem.setAttribute("label", textMgr.get("menu.refresh") + " [" + feed.getName() + "]");
	refreshMenuitem.setAttribute("oncommand", "hudson_process(" + feed.getId() + ");");
	refreshMenuitem.setAttribute("class", "menuitem-iconic");
	refreshMenuitem.setAttribute("image", "chrome://buildmonitor/skin/refresh.png");
	menupopup.appendChild(refreshMenuitem);
	   	
	this.getPanelElement(feed).setAttribute("context", this.getMenusMenupopupId(feed));
}
UIMgr.prototype.getPanelElement = function(component) {
	return document.getElementById(this.getPanelId(component));
}
UIMgr.prototype.getPanelId = function(component) {
	return "hudson-panel-" + this.getComponentId(component);
}
UIMgr.prototype.getTooltipElement = function(component) {
	return document.getElementById(this.getTooltipId(component));
}
UIMgr.prototype.getTooltipId = function(component) {
	return "hudson-tooltip-" + this.getComponentId(component);
}
UIMgr.prototype.getBuildsMenupopupElement = function(component) {
	return document.getElementById(this.getBuildsMenupopupId(component));
}
UIMgr.prototype.getBuildsMenupopupId = function(component) {
	return "hudson-menupopup-builds-" + this.getComponentId(component);
}
UIMgr.prototype.getMenusMenupopupElement = function(component) {
	return document.getElementById(this.getMenusMenupopupId(component));
}
UIMgr.prototype.getMenusMenupopupId = function(component) {
	return "hudson-menupopup-menus-" + this.getComponentId(component);
}
UIMgr.prototype.removePanel = function(component) {
	document.getElementById("hudson-panel-feeds").removeChild(this.getPanelElement(component));
}
UIMgr.prototype.getComponentId = function(component) {
	var id = "main";
	if (component instanceof Feed) {logMgr.debug("is feed");
		id = "feed-" + component.getId();
	} else if (component instanceof ComputerSet) {
		id = "executor-" + component.getId();
	}
	return id;
}
UIMgr.prototype.clear = function(elem) {
	while (elem.firstChild) {
		elem.removeChild(elem.firstChild);
	}
}
UIMgr.prototype.getVisualStatus = function(status) {
	var displayStatus;
	if (status == "success" && this.prefMgr.getSuccessColor() == "green") {
		displayStatus = "success_g";
	} else {
		displayStatus = status;
	}
	return displayStatus;
}