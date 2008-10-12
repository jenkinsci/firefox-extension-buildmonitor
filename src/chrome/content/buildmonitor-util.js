/*****************************************************************
 * TextMgr retrieves text from string bundle.
 */
function TextMgr() {
}
TextMgr.prototype.get = function(key, args) {
	var texts = document.getElementById("hudson-stringbundle");
	var text;
	if (args) {
		text = texts.getFormattedString(key, args);
	} else {
		text = texts.getString(key);
	}
	return text;
}

/*****************************************************************
 * PrefMgr handles preferences saving and loading to and from Firefox configuration
 * (type about:config in Firefox url bar to view all Firefox configuration values).
 */
function PrefMgr(preferences, feeds) {
    this.preferences = preferences;
    this.feeds = feeds;
    this.treeView = null;
    NUM_OF_FEEDS = 15;
}
PrefMgr.prototype.initView = function() {
	this.treeView = {
	    rowCount : NUM_OF_FEEDS,
	    getCellText : function(row, column) {
	    	if (row < feeds.length) {
		    	var text = "???";
		    	if (column.id == "hudson-prefs-feeds-name") {
		    		text = feeds[row].getName();
		    	} else if (column.id == "hudson-prefs-feeds-url") {
		    		text = feeds[row].getUrl();
		    	}
		    	return text;
		    }
	    },
	    isEditable: function isEditable(row, column) {
    		return true;
	    },
	    setCellText : function(row, column, value) {
	    	if (column.id == "hudson-prefs-feeds-name") {
	    		feeds[row].setName(value);
	    	} else if (column.id == "hudson-prefs-feeds-url") {
	    		feeds[row].setUrl(value);
	    	}
	    },
	    setTree: function(treebox) { this.treebox = treebox; },
	    isContainer: function(row) { return false; },
	    isSeparator: function(row) { return false; },
	    isSorted: function() { return false; },
	    getLevel: function(row) { return 0; },
	    getImageSrc: function(row, col) { return null; },
	    getRowProperties: function(row, props) {},
	    getCellProperties: function(row, col, props) {},
	    getColumnProperties: function(colid, col, props) {}
	};
    document.getElementById('hudson-prefs-feeds').view = this.treeView;
}
PrefMgr.prototype.set = function(debug, successColor, feedStatusType, interval, openPage, size, sound, alert) {
    this.preferences.setBoolPref("hudson.debug", debug);
    this.preferences.setCharPref("hudson.successcolor", successColor);
    this.preferences.setCharPref("hudson.feedstatustype", feedStatusType);
    this.preferences.setIntPref("hudson.interval", interval);
    this.preferences.setCharPref("hudson.openpage", openPage);
    this.preferences.setIntPref("hudson.size", size);
    this.preferences.setBoolPref("hudson.sound", sound);
    this.preferences.setBoolPref("hudson.alert", alert);
    for (var i = 0; i < feeds.length; i++) {
    	this.preferences.setCharPref("hudson.feeds." + i + ".name", feeds[i].getName());
    	this.preferences.setCharPref("hudson.feeds." + i + ".url", feeds[i].getUrl());
    	this.preferences.setCharPref("hudson.feeds." + i + ".lastfail", "");
    }
}
PrefMgr.prototype.setLastFail = function(feed, date) {
	this.preferences.setCharPref("hudson.feeds." + feed.getId() + ".lastfail", date);
}
PrefMgr.prototype.getDebug = function() {
    return this.preferences.getBoolPref("hudson.debug");
}
PrefMgr.prototype.getSuccessColor = function() {
    return this.preferences.getCharPref("hudson.successcolor");
}
PrefMgr.prototype.getFeedStatusType = function() {
    return this.preferences.getCharPref("hudson.feedstatustype");
}
PrefMgr.prototype.getInterval = function() {
    return this.preferences.getIntPref("hudson.interval");
}
PrefMgr.prototype.getOpenPage = function() {
    return this.preferences.getCharPref("hudson.openpage");
}
PrefMgr.prototype.getSize = function() {
    return this.preferences.getIntPref("hudson.size");
}
PrefMgr.prototype.getSound = function() {
    return this.preferences.getBoolPref("hudson.sound");
}
PrefMgr.prototype.getAlert = function() {
    return this.preferences.getBoolPref("hudson.alert");
}
PrefMgr.prototype.getFeeds = function() {
	var feeds = new Array();
    for (var i = 0; i < NUM_OF_FEEDS; i++) {
    	var name = this.preferences.getCharPref("hudson.feeds." + i + ".name");
    	var url = this.preferences.getCharPref("hudson.feeds." + i + ".url");
    	feeds[i] = new Feed(i, name, url);
    }
    return feeds;
}
PrefMgr.prototype.getLastFail = function(feed) {
	return this.preferences.getCharPref("hudson.feeds." + feed.getId() + ".lastfail");
}
PrefMgr.prototype.foo = function() {
	// upgrade from 0.7 or older
	if (preferences.prefHasUserValue("hudson.url")) {
		this.preferences.setCharPref("hudson.feeds.0.url", this.preferences.getCharPref("hudson.url"));
		this.preferences.clearUserPref("hudson.url");
	}
}

/*****************************************************************
 * DateMgr provides date manipulation convenience methods.
 */
function DateMgr() {
}
DateMgr.prototype.getDebugDate = function() {
	return (new Date()).toLocaleString();
}

/*****************************************************************
 * LogMgr writes log messages to Firefox console (on Firefox menu: Tools -> Error Console)
 * when Debug Enabled checkbox is ticked on Build Monitor's preferences menu.
 */
function LogMgr(console, prefMgr, dateMgr) {
    this.console = console;
    this.prefMgr = prefMgr;
    this.dateMgr = dateMgr;
}
LogMgr.prototype.debug = function(message, feed) {
    if (this.prefMgr.getDebug() == true) {
    	var id = "main";
    	if (feed) {
    		id = feed.getId() + "-" + feed.getName();
    	}
        this.console.logStringMessage("BuildMonitor [" + this.dateMgr.getDebugDate() + "][" + id + "]: " + message);
    }
}