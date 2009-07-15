var HudsonPreferencesService = HudsonService.extend ({
	getBoolean: function(key) {
		return this.service.getBoolPref(key);
	},
	setBoolean: function(key, value) {
		return this.service.setBoolPref(key, value);
	},
	getString: function(key) {
		return this.service.getCharPref(key);
	},
	setString: function(key, value) {
		this.service.setCharPref(key, value);
	},
	getInteger: function(key) {
		return this.service.getIntPref(key);
	},
	setInteger: function(key, value) {
		this.service.setIntPref(key, value);
	}
});