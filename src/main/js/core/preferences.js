org_hudsonci.Preferences = name_edwards_dean_Base.extend({
	constructor: function(service, numOfFeeds, account) {
		this.service = service;
		this.account = account;
		this.numOfFeeds = numOfFeeds;
	},
	getDebug: function() {
		return this.service.getBoolean('extensions.hudson.buildmonitor.debug');
	},
	getSuccessColor: function() {	
	    return this.service.getString('extensions.hudson.buildmonitor.successcolor');
	},
	getFeedStatusType: function() {	
	    return this.service.getString('extensions.hudson.buildmonitor.feedstatustype');
	},
	getInterval: function() {	
	    return this.service.getInteger('extensions.hudson.buildmonitor.interval');
	},
	getOpenPage: function() {	
	    return this.service.getString('extensions.hudson.buildmonitor.openpage');
	},
	getSize: function() {	
	    return this.service.getInteger('extensions.hudson.buildmonitor.size');
	},
	getSound: function() {	
	    return this.service.getBoolean('extensions.hudson.buildmonitor.sound');
	},
	getAlert: function() {	
	    return this.service.getBoolean('extensions.hudson.buildmonitor.alert');
	},
	getHideName: function() {	
	    return this.service.getBoolean('extensions.hudson.buildmonitor.hidename');
	},
	getExecutor: function() {	
	    return this.service.getBoolean('extensions.hudson.buildmonitor.executor');
	},
    getNetworkUsername: function() {    
        return this.service.getString('extensions.hudson.buildmonitor.networkusername');
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
	    return this.service.getBoolean('extensions.hudson.buildmonitor.identifyrsspattern');
	},
	getFeeds: function() {
		var feeds = [];
	    for (var i = 0; i < this.numOfFeeds; i++) {
	    	var name = this.service.getString('extensions.hudson.buildmonitor.feeds.' + i + '.name');
	    	var url = this.service.getString('extensions.hudson.buildmonitor.feeds.' + i + '.url');
	    	
	    	var lastFail = null;
	    	var lastFailISOString = this.service.getString('extensions.hudson.buildmonitor.feeds.' + i + '.lastfail');
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
		this.service.setString('extensions.hudson.buildmonitor.feeds.' + id + '.name', feed.getName());
		this.service.setString('extensions.hudson.buildmonitor.feeds.' + id + '.url', feed.getUrl());
		
		var lastFail = '';
		if (feed.getLastFail() !== null) {
			lastFail = com_mattkruse_formatDate(feed.getLastFail(), 'yyyy-MM-ddTHH:mm:ssZ');
		}
		this.service.setString('extensions.hudson.buildmonitor.feeds.' + id + '.lastfail', lastFail);
	},
    upgrade: function() {
        var self = this;
        function renamePrefs(names, type) {
            for (var i = 0, max = names.length; i < max; i++) {
                var oldKey = 'hudson.' + names[i];
                var newKey = 'extensions.hudson.buildmonitor.' + names[i];
                if (self.service.exist(oldKey)) {
                    self.service['set' + type](newKey, self.service['get' + type](oldKey));
                    self.service.remove(oldKey);
                }
            }
        }
        // from v1.5.6 to v1.5.7 or newer, preference names were changed
        // from hudson.<name> to extensions.hudson.buildmonitor.<name>
        renamePrefs(['debug', 'sound', 'alert', 'hidename', 'executor'], 'Boolean');
        renamePrefs(['successcolor', 'feedstatustype', 'openpage', 'networkusername'], 'String');
        renamePrefs(['interval', 'size'], 'Integer');
        for (var i = 0; i < this.numOfFeeds; i++) {
            renamePrefs(['feeds.' + i + '.lastfail', 'feeds.' + i + '.name', 'feeds.' + i + '.url'], 'String');
        }
    }
});