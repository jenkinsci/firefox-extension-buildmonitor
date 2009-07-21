const TYPE_EXECUTOR = 'executor';
const TYPE_HISTORIC = 'historic';
var HudsonUiUtil = Base.extend({
	getStatusSkinType: function(type) {
		var statusSkinType;
		if (type == TYPE_EXECUTOR) {
			statusSkinType = 'executor';
		} else {
			statusSkinType = 'build';
		}
		return statusSkinType;
	},
	getUrl: function(type, feed) {
		var url;
		if (type == TYPE_EXECUTOR) {
			url = feed.getExecutorUrl();
		} else {
			url = feed.getUrl();
		}
		return url;		
	},
	clear: function(elem) {
		while (elem.firstChild) {
			elem.removeChild(elem.firstChild);
		}
	}
});