org_hudsonci.UiUtil = name_edwards_dean_Base.extend({
	getStatusSkinType: function(type) {
		var statusSkinType;
		if (type == org_hudsonci_buildMonitorConst.TYPE_EXECUTOR()) {
			statusSkinType = 'executor';
		} else {
			statusSkinType = 'build';
		}
		return statusSkinType;
	},
	getVisualStatus: function(status, successColor) {
		var visualStatus;
		if (status == 'success' && successColor == 'green') {
			visualStatus = status + '_' + successColor;
		} else {
			visualStatus = status;
		}
		return visualStatus;
	},
	getUrl: function(type, feed) {
		var url;
		if (type == org_hudsonci_buildMonitorConst.TYPE_EXECUTOR()) {
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