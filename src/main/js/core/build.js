var Build = DUI.Class.create({
	init: function(name, url) {
		this.name = name;
		this.url = url;
	},
	getName: function() {
		return this.name;
	},
	getUrl: function() {
		return this.url;
	}
});
Build.namespace('Hudson');