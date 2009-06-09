var Util = DUI.Class.create({
	getBoolean: function(stringValue) {
		var booleanValue = Boolean(false);
		if (stringValue == 'true') {
			booleanValue = Boolean(true);
		}
		return booleanValue;
	},
	getInteger: function(stringValue) {
		return 1 * stringValue;
	}
});
Util.namespace('Hudson');