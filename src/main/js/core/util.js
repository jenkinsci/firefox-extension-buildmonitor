org_hudsonci_namespace('org_hudsonci');
org_hudsonci.Util = name_edwards_dean_Base.extend({
	getBoolean: function(stringValue) {
		var booleanValue = Boolean(false);
		if (stringValue == 'true') {
			booleanValue = Boolean(true);
		}
		return booleanValue;
	},
	getInteger: function(stringValue) {
		return 1 * stringValue;
	},
	getLogDate: function() {
		return (new Date()).toLocaleString();
	},
	isHudsonRss: function(url) {
		var isHudsonRss = true;
		if (url.match('/rss') === null) {
			isHudsonRss = false;
		}
		return isHudsonRss;
	}
});
org_hudsonci.Const = name_edwards_dean_Base.extend({
    TYPE_EXECUTOR: function() {
        return 'executor';
    },
    TYPE_HISTORIC: function() {
        return 'historic';
    }
});