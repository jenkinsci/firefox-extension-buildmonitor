var HudsonExecutorBuild = HudsonBuild.extend ({
	init: function(name, url, progress, isIdle, isStuck, executorName) {
		this._super(name, url);
		this.progress = progress;
		this.isIdle = isIdle;
		this.isStuck = isStuck;
		this.executorName = executorName;
	},
	getProgress: function() {
		return this.progress;
	},
	getIdle: function() {
		return this.isIdle;
	},
	getStuck: function() {
		return this.isStuck;
	},
	getExecutorName: function() {
		return this.executorName;
	},
	getStatus: function() {
		var status;
		if (this.isIdle == true) {
			status = 'idle';
		} else if (this.isStuck == true) {
			status = 'stuck';
		} else {
			status = 'running';
		}
		return status;
	},
	getDetails: function() {
		var details = '';
		if (this.isOffline == true) {
			details += 'Offline';
		} else if (this.isIdle == true) {
			details += 'Idle';
		} else if (this.progress >= 0) {
			details += this.progress + '% - ' + this.name;
		} else {
			details += this.name;
		}
	    details += ' - ' + this.executorName;
	    return details;
	}
});