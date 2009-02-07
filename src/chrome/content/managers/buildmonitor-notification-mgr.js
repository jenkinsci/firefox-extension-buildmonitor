/*****************************************************************
 * NotificationMgr handles non-successful build notification.
 */
function NotificationMgr(sound, io, alerts) {
	this.sound = sound;
	this.io = io;
	this.alerts = alerts;
}
NotificationMgr.prototype.playSound = function(status) {
	this.sound.play(io.newURI("chrome://buildmonitor/skin/" + status + ".wav", null, null));
}
NotificationMgr.prototype.displayAlert = function(feed, title, build) {
	this.alerts.showAlertNotification("chrome://buildmonitor/skin/" + build.getStatus() + ".png", title + "[" + feed.getName() + "]", build.getDetails(), false);
}