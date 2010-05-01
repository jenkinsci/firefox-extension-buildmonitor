org_hudsonci.NotificationService = name_edwards_dean_Base.extend ({
	constructor: function(ffAlertsService, ffSound, ffIoService) {
		this.ffAlertsService = ffAlertsService;
		this.ffSound = ffSound;
		this.ffIoService = ffIoService;
		this.uiUtil = new org_hudsonci.UiUtil();
	},
	displayAlert: function(type, title, feed, build) {
		this.ffAlertsService.showAlertNotification('chrome://buildmonitor/skin/status/' + this.uiUtil.getStatusSkinType(type) + '/' + build.getStatus() + '.png', title + ' [' + feed.getName() + ']', build.getDetails(), false);
	},
	playSound: function(build) {
		this.ffSound.play(this.ffIoService.newURI('chrome://buildmonitor/skin/audio/' + build.getStatus() + '.wav', null, null));
	}
});