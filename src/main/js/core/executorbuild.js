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
	}
});