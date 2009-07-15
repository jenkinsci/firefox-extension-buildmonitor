var HudsonPreferences = Base.extend({
	constructor: function(service, numOfFeeds) {
		this.service = service;
		this.numOfFeeds = numOfFeeds;
	},
	getDebug: function() {
		return this.service.getBoolean('hudson.debug');
	},
	getSuccessColor: function() {	
	    return this.service.getString('hudson.successcolor');
	},
	getFeedStatusType: function() {	
	    return this.service.getString('hudson.feedstatustype');
	},
	getInterval: function() {	
	    return this.service.getInteger('hudson.interval');
	},
	getOpenPage: function() {	
	    return this.service.getString('hudson.openpage');
	},
	getSize: function() {	
	    return this.service.getInteger('hudson.size');
	},
	getSound: function() {	
	    return this.service.getBoolean('hudson.sound');
	},
	getAlert: function() {	
	    return this.service.getBoolean('hudson.alert');
	},
	getHideName: function() {	
	    return this.service.getBoolean('hudson.hidename');
	},
	getExecutor: function() {	
	    return this.service.getBoolean('hudson.executor');
	},
	getNetworkUsername: function() {	
	    return this.service.getString('hudson.networkusername');
	},
	getNetworkPassword: function() {	
	    return this.service.getString('hudson.networkpassword');
	},
	getIdentifyRssPattern: function() {	
	    return this.service.getBoolean('hudson.identifyrsspattern');
	},
	getFeeds: function() {
		var feeds = new Array();
	    for (var i = 0; i < this.numOfFeeds; i++) {
	    	var name = this.service.getString('hudson.feeds.' + i + '.name');
	    	var url = this.service.getString('hudson.feeds.' + i + '.url');
	    	
	    	var lastFail = null;
	    	var lastFailISOString = this.service.getString('hudson.feeds.' + i + '.lastfail');
	    	if (lastFailISOString != null && lastFailISOString.length > 0) {
	    		lastFail = Date.parseExact(lastFailISOString, 'yyyy-MM-ddTHH:mm:ssZ');
	    	}
	    	feeds[i] = new HudsonFeed(i, name, url, lastFail);
	    }
	    return feeds;
	},
	addFeed: function(feed) {
		this._setFeed(feed);
	},
	removeFeed: function(feed) {
		var feeds = this.getFeeds();
	    for (var i = feed.getId() + 1; i < feeds.length; i++) {
	    	feeds[i].setId(i - 1);
	    	this._setFeed(feeds[i]);
	    }
	    var emptyLastFeed = new HudsonFeed(feeds.length - 1, '', '', null);
	    this._setFeed(emptyLastFeed);
	},
	_setFeed: function(feed) {
		var id = feed.getId();
		this.service.setString('hudson.feeds.' + id + '.name', feed.getName());
		this.service.setString('hudson.feeds.' + id + '.url', feed.getUrl());
		
		var lastFail = '';
		if (feed.getLastFail() != null) {
			lastFail = feed.getLastFail().toString('yyyy-MM-ddTHH:mm:ssZ');
		}
		this.service.setString('hudson.feeds.' + id + '.lastfail', lastFail);
	}
});