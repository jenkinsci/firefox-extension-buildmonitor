var HudsonNotification = Base.extend({
	constructor: function(service, preferences) {
		this.service = service;
		this.preferences = preferences;
	},
	displayAlert: function(type, feed, build, title) {
	    if (this.preferences.getAlert()) {
	    	this.service.displayAlert(type, feed, build, title);
	    }
	},
	playSound: function(feed) {
	    if (this.preferences.getSound()) {
	    	this.service.playSound(feed);
	    }
	}
});