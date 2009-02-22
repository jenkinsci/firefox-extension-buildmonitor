/*****************************************************************
 * HudsonNotificationMgr handles non-successful build notification.
 */
function HudsonNotificationMgr(sound, io, alerts) {
	this.sound = sound;
	this.io = io;
	this.alerts = alerts;
}
HudsonNotificationMgr.prototype.playSound = function(status) {
	this.sound.play(io.newURI("chrome://buildmonitor/skin/" + status + ".wav", null, null));
}
HudsonNotificationMgr.prototype.displayAlert = function(feed, title, build) {
	this.alerts.showAlertNotification("chrome://buildmonitor/skin/" + build.getStatus() + ".png", title + "[" + feed.getName() + "]", build.getDetails(), false);
}