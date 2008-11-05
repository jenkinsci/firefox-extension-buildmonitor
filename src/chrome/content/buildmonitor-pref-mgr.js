/*****************************************************************
 * PrefMgr handles preferences saving and loading to and from Firefox configuration
 * (type about:config in Firefox url bar to view all Firefox configuration values).
 */
function PrefMgr(preferences) {
    NUM_OF_FEEDS = 15;
    this.preferences = preferences;
    this.treeFeeds = null;
    this.treeView = null;
}
PrefMgr.prototype.initView = function() {
	treeFeeds = this.getFeeds();
	this.treeView = {
	    rowCount : NUM_OF_FEEDS,
	    getCellText : function(row, column) {
	    	if (row < treeFeeds.length) {
		    	var text = null;
		    	if (column.id == "hudson-prefs-feeds-name") {
		    		text = treeFeeds[row].getName();
		    	} else if (column.id == "hudson-prefs-feeds-url") {
		    		text = treeFeeds[row].getUrl();
		    	}
		    	return text;
		    }
	    },
	    isEditable: function isEditable(row, column) {
    		return true;
	    },
	    setCellText : function(row, column, value) {
	    	if (column.id == "hudson-prefs-feeds-name") {
	    		treeFeeds[row].setName(value);
	    	} else if (column.id == "hudson-prefs-feeds-url") {
	    		treeFeeds[row].setUrl(value);
	    	}
	    },
	    setTree: function(treebox) { this.treebox = treebox; },
	    isContainer: function(row) { return false; },
	    isSeparator: function(row) { return false; },
	    isSorted: function() { return false; },
	    getLevel: function(row) { return 0; },
	    getImageSrc: function(row, column) {
	    	var imageSrc = null;
	    	var url = treeFeeds[row].getUrl();
	    	if (column.id == "hudson-prefs-feeds-remove" && url != null && url.length > 0) {
	    		imageSrc = "chrome://buildmonitor/skin/remove.png";
	    	}
	    	return imageSrc;
	    },
	    getRowProperties: function(row, props) {},
	    getCellProperties: function(row, col, props) {},
	    getColumnProperties: function(colid, col, props) {}
	};
    document.getElementById("hudson-prefs-feeds").view = this.treeView;
}
PrefMgr.prototype.saveView = function() {
    for (var i = 0; i < treeFeeds.length; i++) {
    	this.setFeed(treeFeeds[i], "");
    }
}
PrefMgr.prototype.removeFeedFromView = function(index) {
    for (var i = index; i < treeFeeds.length - 1; i++) {
    	treeFeeds[i].setName(treeFeeds[i + 1].getName());
    	treeFeeds[i].setUrl(treeFeeds[i + 1].getUrl());
    }
    treeFeeds[treeFeeds.length - 1].clear();
}
PrefMgr.prototype.getEmptyFeedIndex = function() {
	var emptyFeedIndex = -1;
	for (var i = 0; i < feeds.length; i++) {
		if (feeds[i].isEmpty()) {
			emptyFeedIndex = i;
			break;
		}
	}
	return emptyFeedIndex;
}
PrefMgr.prototype.addFeed = function(name, url) {
	var feed = null;
	var i = this.getEmptyFeedIndex();
	if (i != -1) {
		feeds[i].setName(name);
		feeds[i].setUrl(url);
		this.setFeed(feeds[i], "");
		feed = feeds[i];
	}
	return feed;
}
PrefMgr.prototype.iCanHazFeedburger = function() {
	return (this.getEmptyFeedIndex() != -1);
}
PrefMgr.prototype.removeFeed = function(feed) {
    for (var i = feed.getId(); i < feeds.length - 1; i++) {
    	feeds[i].setName(feeds[i + 1].getName());
    	feeds[i].setUrl(feeds[i + 1].getUrl());
    	this.setFeed(feeds[i], this.getLastFail(feeds[i + 1]));
    }
    feeds[feeds.length - 1].clear();
    this.setFeed(feeds[feeds.length - 1], "");
}
PrefMgr.prototype.setFeed = function(feed, lastFail) {
	var id = feed.getId();
	this.preferences.setCharPref("hudson.feeds." + id + ".name", feed.getName());
	this.preferences.setCharPref("hudson.feeds." + id + ".url", feed.getUrl());
	this.preferences.setCharPref("hudson.feeds." + id + ".lastfail", lastFail);
}
PrefMgr.prototype.setLastFail = function(feed, lastFail) {
	this.preferences.setCharPref("hudson.feeds." + feed.getId() + ".lastfail", lastFail);
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
PrefMgr.prototype.upgrade = function() {
	// upgrade from 0.7 or older
	if (preferences.prefHasUserValue("hudson.url")) {
		this.preferences.setCharPref("hudson.feeds.0.url", this.preferences.getCharPref("hudson.url"));
		this.preferences.clearUserPref("hudson.url");
	}
}