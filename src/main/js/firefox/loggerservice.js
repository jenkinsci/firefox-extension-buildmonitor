var HudsonLoggerService = Base.extend ({
	constructor: function(ffConsoleService) {
		this.ffConsoleService = ffConsoleService;
	},
	debug: function(message) {
		this.ffConsoleService.logStringMessage(message);
	}
});