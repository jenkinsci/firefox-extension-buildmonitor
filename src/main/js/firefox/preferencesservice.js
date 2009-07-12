var HudsonPreferencesService = HudsonService.extend ({
	getBoolean: function(key) {
		return this.service.getBoolPref(key);
	},
	getString: function(key) {
		return this.service.getCharPref(key);
	},
	setString: function(key, value) {
		this.service.setCharPref(key, value);
	}
});