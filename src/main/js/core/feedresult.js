org_hudsonci.FeedResult = name_edwards_dean_Base.extend({
	constructor: function(title, builds, status) {
		this.title = title;
		this.builds = builds;
		this.status = status;
	},
	getTitle: function() {
		return this.title;
	},
	getBuilds: function() {
		return this.builds;
	},
	getStatus: function() {
		return this.status;
	}
});