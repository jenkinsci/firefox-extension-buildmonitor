var HudsonUiElement = Class.extend({
	init: function(type) {
		this.type = type;
	},
	init: function(type, localiser) {
		this.type = type;
		this.localiser = localiser;
	},
	getUiElementId: function(feed) {
		return this.type + '-' + feed.getId();
	},
	clear: function(elem) {
		while (elem.firstChild) {
			elem.removeChild(elem.firstChild);
		}
	}
});