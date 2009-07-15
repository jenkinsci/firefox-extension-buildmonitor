var HudsonLogger = Base.extend({
	constructor: function(service, util, preferences) {
		this.service = service;
		this.util = util;
		this.preferences = preferences;
	},
	debug: function(message, feed) {
	    if (this.preferences.getDebug()) {
	    	var id = 'main';
	    	if (feed) {
	    		id = feed.getId() + '-' + feed.getName();
	    	}
	        this.service.debug('BuildMonitor [' + this.util.getLogDate() + '][' + id + ']: ' + message);
	    }
	}
});