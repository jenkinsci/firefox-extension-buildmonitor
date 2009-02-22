/*****************************************************************
 * HudsonPrefMgr handles preferences saving and loading to and from Firefox configuration
 * (type about:config in Firefox url bar to view all Firefox configuration values).
 */
function HudsonPrefMgr(preferences) {
    NUM_OF_FEEDS = 15;
    this.preferences = preferences;
}
HudsonPrefMgr.prototype.getEmptyFeedIndex = function() {
	var emptyFeedIndex = -1;
	for (var i = 0; i < feeds.length; i++) {
		if (feeds[i].isEmpty()) {
			emptyFeedIndex = i;
			break;
		}
	}
	return emptyFeedIndex;
}
HudsonPrefMgr.prototype.addFeed = function(name, url) {
	var i = this.getEmptyFeedIndex();
	if (i != -1) {
		feeds[i].setName(name);
		feeds[i].setUrl(url);
		this.setFeed(feeds[i], "");
	}
}
HudsonPrefMgr.prototype.iCanHazFeedburger = function() {
	return (this.getEmptyFeedIndex() != -1);
}
HudsonPrefMgr.prototype.removeFeed = function(feed) {
    for (var i = feed.getId(); i < feeds.length - 1; i++) {
    	feeds[i].setName(feeds[i + 1].getName());
    	feeds[i].setUrl(feeds[i + 1].getUrl());
    	this.setFeed(feeds[i], this.getLastFail(feeds[i + 1]));
    }
    feeds[feeds.length - 1].clear();
    this.setFeed(feeds[feeds.length - 1], "");
}
HudsonPrefMgr.prototype.setFeed = function(feed, lastFail) {
	var id = feed.getId();
	this.preferences.setCharPref("hudson.feeds." + id + ".name", feed.getName());
	this.preferences.setCharPref("hudson.feeds." + id + ".url", feed.getUrl());
	this.preferences.setCharPref("hudson.feeds." + id + ".lastfail", lastFail);
}
HudsonPrefMgr.prototype.setLastFail = function(feed, lastFail) {
	this.preferences.setCharPref("hudson.feeds." + feed.getId() + ".lastfail", lastFail);
}
HudsonPrefMgr.prototype.getDebug = function() {
    return this.preferences.getBoolPref("hudson.debug");
}
HudsonPrefMgr.prototype.getSuccessColor = function() {
    return this.preferences.getCharPref("hudson.successcolor");
}
HudsonPrefMgr.prototype.getFeedStatusType = function() {
    return this.preferences.getCharPref("hudson.feedstatustype");
}
HudsonPrefMgr.prototype.getInterval = function() {
    return this.preferences.getIntPref("hudson.interval");
}
HudsonPrefMgr.prototype.getOpenPage = function() {
    return this.preferences.getCharPref("hudson.openpage");
}
HudsonPrefMgr.prototype.getSize = function() {
    return this.preferences.getIntPref("hudson.size");
}
HudsonPrefMgr.prototype.getSound = function() {
    return this.preferences.getBoolPref("hudson.sound");
}
HudsonPrefMgr.prototype.getAlert = function() {
    return this.preferences.getBoolPref("hudson.alert");
}
HudsonPrefMgr.prototype.getHideName = function() {
    return this.preferences.getBoolPref("hudson.hidename");
}
HudsonPrefMgr.prototype.getExecutor = function() {
    return this.preferences.getBoolPref("hudson.executor");
}
HudsonPrefMgr.prototype.getFeeds = function() {
	var feeds = new Array();
    for (var i = 0; i < NUM_OF_FEEDS; i++) {
    	var name = this.preferences.getCharPref("hudson.feeds." + i + ".name");
    	var url = this.preferences.getCharPref("hudson.feeds." + i + ".url");
    	feeds[i] = new HudsonFeed(i, name, url);
    	if (this.getExecutor() && !feeds[i].isJob()) {
    		feeds[i].initExecutorFeed();
    	}
    }
    return feeds;
}
HudsonPrefMgr.prototype.getLastFail = function(feed) {
	return this.preferences.getCharPref("hudson.feeds." + feed.getId() + ".lastfail");
}
HudsonPrefMgr.prototype.upgrade = function() {
	// upgrade from 0.7 or older
	if (preferences.prefHasUserValue("hudson.url")) {
		this.preferences.setCharPref("hudson.feeds.0.url", this.preferences.getCharPref("hudson.url"));
		this.preferences.clearUserPref("hudson.url");
	}
}