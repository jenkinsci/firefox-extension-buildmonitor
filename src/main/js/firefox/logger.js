var HudsonLogger = Class.extend({
	init: function(consoleService, util, isDebug) {
		this.consoleService = consoleService;
		this.util = util;
		this.isDebug = isDebug;
	},
	debug: function(message, feed) {
	    if (this.isDebug) {
	    	var id = 'main';
	    	if (feed) {
	    		id = feed.getId() + '-' + feed.getName();
	    	}
	        this.consoleService.logStringMessage('BuildMonitor [' + this.util.getLogDate() + '][' + id + ']: ' + message);
	    }
	}
});