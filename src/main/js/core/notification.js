var HudsonNotification = Base.extend({
	constructor: function(service, preferences) {
		this.service = service;
		this.preferences = preferences;
	},
	process: function(type, feed, result) {
		var builds = result.getBuilds();
		// TODO: move type specific logic checking to their own classes
		if (type == TYPE_HISTORIC) {
			for (var i = 0; i < builds.length; i++) {
				if (builds[i].isFailure()) {
					var lastFail = feed.getLastFail();
					if (lastFail == null || lastFail == '' || lastFail < builds[i].getDate()) {
						feed.setLastFail(builds[i].getDate());
						this.preferences.addFeed(feed);
						this.displayAlert(type, feed, builds[i], result.getTitle());
						this.playSound(builds[i]);
					}
					break;
				}
			}
		} else if (type == TYPE_EXECUTOR) {
			for (var i = 0; i < builds.length; i++) {
				if (builds[i].getStatus() == 'stuck') {
					this.displayAlert(type, feed, builds[i], result.getTitle());
					this.playSound(builds[i]);
					break;
				}
			}
		}
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