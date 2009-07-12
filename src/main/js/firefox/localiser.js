var HudsonLocaliser = Base.extend({
	setBundle: function(bundle) {
		this.bundle = bundle;
	},
	getText: function(key, args) {
		var text;
		if (args) {
			text = this.bundle.getFormattedString(key, args);
		} else {
			text = this.bundle.getString(key);
		}
		return text;
	}
});