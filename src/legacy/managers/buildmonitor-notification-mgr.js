/*****************************************************************
 * HudsonNotificationMgr handles non-successful build notification.
 */
function HudsonNotificationMgr(sound, io, alerts, prefMgr) {
	this.sound = sound;
	this.io = io;
	this.alerts = alerts;
	this.prefMgr = prefMgr;
}
HudsonNotificationMgr.prototype.playSound = function(status) {
	if (prefMgr.getSound()) {
		this.sound.play(io.newURI("chrome://buildmonitor/skin/" + status + ".wav", null, null));
	}
}
HudsonNotificationMgr.prototype.displayAlert = function(feed, title, item) {
	if (prefMgr.getAlert()) {
		this.alerts.showAlertNotification("chrome://buildmonitor/skin/" + item.getStatus() + ".png", title + "[" + feed.getName() + "]", item.getDetails(), false);
	}
}