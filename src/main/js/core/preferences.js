org_hudsonci.Preferences = name_edwards_dean_Base.extend({
	constructor: function(service, numOfFeeds, account) {
		this.service = service;
		this.account = account;
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
	    var networkUsername = this.getNetworkUsername();
	    var networkPassword = '';
	    if (networkUsername !== null && networkUsername !== '') {
    	    var account = this.account.load('realm-buildmonitor', networkUsername);
    	    if (account !== null) {
    	        networkPassword = account.password;
    	    }
    	}
        return networkPassword;
	},
	getIdentifyRssPattern: function() {	
	    return this.service.getBoolean('hudson.identifyrsspattern');
	},
	getFeeds: function() {
		var feeds = [];
	    for (var i = 0; i < this.numOfFeeds; i++) {
	    	var name = this.service.getString('hudson.feeds.' + i + '.name');
	    	var url = this.service.getString('hudson.feeds.' + i + '.url');
	    	
	    	var lastFail = null;
	    	var lastFailISOString = this.service.getString('hudson.feeds.' + i + '.lastfail');
	    	if (lastFailISOString !== null && lastFailISOString.length > 0) {
	    		lastFail = com_mattkruse_getDateFromFormat(lastFailISOString, 'yyyy-MM-ddTHH:mm:ssZ');
	    	}
	    	feeds[i] = new org_hudsonci.Feed(i, name, url, lastFail);
	    }
	    return feeds;
	},
	addFeed: function(feed) {
		this.setFeed(feed);
	},
	removeFeed: function(feed) {
		var feeds = this.getFeeds();
	    for (var i = feed.getId() + 1; i < feeds.length; i++) {
	    	feeds[i].setId(i - 1);
	    	this.setFeed(feeds[i]);
	    }
	    var emptyLastFeed = new org_hudsonci.Feed(feeds.length - 1, '', '', null);
	    this.setFeed(emptyLastFeed);
	},
    setNetworkPassword: function(networkUsername, networkPassword) {
        this.account.save('realm-buildmonitor', networkUsername, networkPassword);
    },
	setFeed: function(feed) {
		var id = feed.getId();
		this.service.setString('hudson.feeds.' + id + '.name', feed.getName());
		this.service.setString('hudson.feeds.' + id + '.url', feed.getUrl());
		
		var lastFail = '';
		if (feed.getLastFail() !== null) {
			lastFail = com_mattkruse_formatDate(feed.getLastFail(), 'yyyy-MM-ddTHH:mm:ssZ');
		}
		this.service.setString('hudson.feeds.' + id + '.lastfail', lastFail);
	}
});