var HudsonUiElement = Class.extend({
	init: function(type) {
		this.type = type;
		this.uiUtil = new HudsonUiUtil();
	},
	init: function(type, localiser) {
		this.type = type;
		this.localiser = localiser;
		this.uiUtil = new HudsonUiUtil();
	},
	getUiElementId: function(feed) {
		return this.type + '-' + feed.getId();
	}
});