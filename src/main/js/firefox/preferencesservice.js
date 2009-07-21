var HudsonPreferencesService = Base.extend ({
	constructor: function(ffPreferencesService) {
		this.ffPreferencesService = ffPreferencesService;
	},
	getBoolean: function(key) {
		return this.ffPreferencesService.getBoolPref(key);
	},
	setBoolean: function(key, value) {
		return this.ffPreferencesService.setBoolPref(key, value);
	},
	getString: function(key) {
		return this.ffPreferencesService.getCharPref(key);
	},
	setString: function(key, value) {
		this.ffPreferencesService.setCharPref(key, value);
	},
	getInteger: function(key) {
		return this.ffPreferencesService.getIntPref(key);
	},
	setInteger: function(key, value) {
		this.ffPreferencesService.setIntPref(key, value);
	}
});