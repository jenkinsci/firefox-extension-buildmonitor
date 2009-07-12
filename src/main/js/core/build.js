var HudsonBuild = Base.extend({
	constructor: function(name, url) {
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