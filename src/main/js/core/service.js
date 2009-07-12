var HudsonService = Base.extend({
	constructor: function(service) {
		this.service = service;
	},
	getInstance: function() {
		return this.service;
	}
});