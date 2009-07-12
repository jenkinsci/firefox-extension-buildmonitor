var HudsonMenuItem = Base.extend({
	constructor: function(title, url, icon) {
		this.title = title;
		this.url = url;
		this.icon = icon;
	},
	getTitle: function() {
		return this.title;
	},
	getUrl: function() {
		return this.url;
	},
	getIcon: function() {
		return this.icon;
	}
});