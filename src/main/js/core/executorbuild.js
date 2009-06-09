var ExecutorBuild = DUI.Class.create(Build.prototype, {
	init: function(name, url, progress, isIdle, isStuck, executorName) {
		this.name = name;
		this.url = url;
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
ExecutorBuild.namespace('Hudson');