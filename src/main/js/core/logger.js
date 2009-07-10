var HudsonLogger = Class.extend({
	init: function(service, util, isDebug) {
		this.service = service;
		this.util = util;
		this.isDebug = isDebug;
	},
	debug: function(message, feed) {
	    if (this.isDebug) {
	    	var id = 'main';
	    	if (feed) {
	    		id = feed.getId() + '-' + feed.getName();
	    	}
	        this.service.debug('BuildMonitor [' + this.util.getLogDate() + '][' + id + ']: ' + message);
	    }
	}
});