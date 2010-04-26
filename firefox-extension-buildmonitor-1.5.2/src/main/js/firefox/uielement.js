org_hudsonci.UiElement = Base.extend({
	constructor: function(type) {
		this.type = type;
		this.uiUtil = new org_hudsonci.UiUtil();
	},
	constructor: function(type, localiser) {
		this.type = type;
		this.localiser = localiser;
		this.uiUtil = new org_hudsonci.UiUtil();
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