var HudsonUiUtil = Class.extend({
	getStatusSkinType: function(type) {
		var statusSkinType;
		if (type == TYPE_EXECUTOR) {
			statusSkinType = 'executor';
		} else {
			statusSkinType = 'build';
		}
		return statusSkinType;
	},
	clear: function(elem) {
		while (elem.firstChild) {
			elem.removeChild(elem.firstChild);
		}
	}
});