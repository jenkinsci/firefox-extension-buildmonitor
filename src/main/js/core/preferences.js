var HudsonPreferences = Class.extend({
	init: function(service, numOfFeeds) {
		this.service = service;
		this.numOfFeeds = numOfFeeds;
	},
	getDebug: function() {
		return this.service.getBoolean('hudson.debug');
	},
	getFeeds: function() {
		var feeds = new Array();
	    for (var i = 0; i < this.numOfFeeds; i++) {
	    	var name = this.service.getString('hudson.feeds.' + i + '.name');
	    	var url = this.service.getString('hudson.feeds.' + i + '.url');
	    	feeds[i] = new HudsonFeed(i, name, url);
	    	//if (this.getExecutor() && !feeds[i].isJob()) {
	    	//	feeds[i].initExecutorFeed();
	    	//}
	    }
	    return feeds;
	}
});