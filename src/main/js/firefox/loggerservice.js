org_hudsonci.LoggerService = name_edwards_dean_Base.extend ({
	constructor: function(ffConsoleService) {
		this.ffConsoleService = ffConsoleService;
	},
	debug: function(message) {
		this.ffConsoleService.logStringMessage(message);
	}
});