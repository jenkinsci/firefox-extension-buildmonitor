var HudsonPreferences = Class.extend({
	init: function(preferencesService, numOfFeeds) {
		this.preferencesService = preferencesService;
		this.numOfFeeds = numOfFeeds;
	},
	getDebug: function() {
		return this.preferencesService.getBoolPref('hudson.debug');
	},
	getFeeds: function() {
		var feeds = new Array();
	    for (var i = 0; i < this.numOfFeeds; i++) {
	    	var name = this.preferencesService.getCharPref('hudson.feeds.' + i + '.name');
	    	var url = this.preferencesService.getCharPref('hudson.feeds.' + i + '.url');
	    	feeds[i] = new HudsonFeed(i, name, url);
	    	//if (this.getExecutor() && !feeds[i].isJob()) {
	    	//	feeds[i].initExecutorFeed();
	    	//}
	    }
	    return feeds;
	}
});