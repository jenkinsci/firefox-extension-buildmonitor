var HudsonLoggerService = HudsonService.extend ({
	debug: function(message) {
		this.service.logStringMessage(message);
	}
});