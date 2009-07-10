var HudsonService = Class.extend({
	init: function(service) {
		this.service = service;
	},
	getInstance: function() {
		return this.service;
	}
});