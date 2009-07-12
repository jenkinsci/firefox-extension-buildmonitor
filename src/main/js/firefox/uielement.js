var HudsonUiElement = Base.extend({
	constructor: function(type) {
		this.type = type;
		this.uiUtil = new HudsonUiUtil();
	},
	constructor: function(type, localiser) {
		this.type = type;
		this.localiser = localiser;
		this.uiUtil = new HudsonUiUtil();
	},
	getUiElementId: function(feed) {
		return this.type + '-' + feed.getId();
	},
	isHistoric: function() {
		var isHistoric = false;
		if (this.type == TYPE_HISTORIC) {
			isHistoric = true;
		}
		return isHistoric;
	},
	isExecutor: function() {
		var isExecutor = false;
		if (this.type == TYPE_EXECUTOR) {
			isExecutor = true;
		}
		return isExecutor;
	}
});