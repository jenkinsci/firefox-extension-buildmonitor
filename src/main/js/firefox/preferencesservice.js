var HudsonPreferencesService = HudsonService.extend ({
	getBoolean: function(key) {
		return this.service.getBoolPref(key);
	},
	getString: function(key) {
		return this.service.getCharPref(key);
	}
});