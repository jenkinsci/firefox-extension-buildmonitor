/*****************************************************************
 * HudsonComputer represents a computer within Hudson master/slave set up.
 */
function HudsonComputer(
		displayName, isIdle, isOffline, monitorData, executors) {
	this.displayName = displayName;
	this.isIdle = isIdle;
	this.isOffline = isOffline;
	this.monitorData = monitorData;
	this.executors = executors;
}
HudsonComputer.prototype.getDisplayName = function() {
	return this.displayName;
}
HudsonComputer.prototype.isIdle = function() {
	return this.isIdle;
}
HudsonComputer.prototype.isOffline = function() {
	return this.isOffline;
}
HudsonComputer.prototype.getMonitorData = function() {
	return this.monitorData;
}
HudsonComputer.prototype.getExecutors = function() {
	return this.executors;
}