org_hudsonci.Notification = name_edwards_dean_Base.extend({
	constructor: function(service, preferences) {
		this.service = service;
		this.preferences = preferences;
	},
	displayAlert: function(type, feed, build, title) {
	    if (this.preferences.getAlert()) {
	    	this.service.displayAlert(type, title, feed, build);
	    }
	},
	playSound: function(build) {
	    if (this.preferences.getSound()) {
	    	this.service.playSound(build);
	    }
	}
});