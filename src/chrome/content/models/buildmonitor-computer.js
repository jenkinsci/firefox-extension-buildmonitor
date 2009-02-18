/*****************************************************************
 * Computer is a computer within Hudson master/slave set up.
 */
function Computer(
		displayName, isIdle, isOffline, monitorData) {
	this.displayName = displayName;
	this.isIdle = isIdle;
	this.isOffline = isOffline;
	this.monitorData = monitorData;
}
Computer.prototype.getDisplayName = function() {
	return this.displayName;
}
Computer.prototype.isIdle = function() {
	return this.isIdle;
}
Computer.prototype.isOffline = function() {
	return this.isOffline;
}
Computer.prototype.getMonitorData = function() {
	return this.monitorData;
}