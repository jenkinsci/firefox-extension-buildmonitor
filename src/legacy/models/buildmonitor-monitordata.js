/*****************************************************************
 * HudsonMonitorData keeps information related to the computer.
 */
function HudsonMonitorData(
		availablePhysicalMemory,
		availableSwapSpace,
		totalPhysicalMemory,
		totalSwapSpace,
		architecture,
		averageResponseTime,
		diskSpace) {
	this.availablePhysicalMemory = availablePhysicalMemory;
	this.availableSwapSpace = availableSwapSpace;
	this.totalPhysicalMemory = totalPhysicalMemory;
	this.totalSwapSpace = totalSwapSpace;
	this.architecture = architecture;
	this.averageResponseTime = averageResponseTime;
	this.diskSpace = diskSpace;
}
HudsonMonitorData.prototype.getPhysicalMemory = function() {
	return (this.availablePhysicalMemory != null && this.totalPhysicalMemory)
		? prettyBytes(this.availablePhysicalMemory) + "/" + prettyBytes(this.totalPhysicalMemory)
		: null;
}
HudsonMonitorData.prototype.getSwapSpace = function() {
	return (this.availableSwapSpace != null && this.totalSwapSpace != null)
		? prettyBytes(this.availableSwapSpace) + "/" + prettyBytes(this.totalSwapSpace)
		: null;
}
HudsonMonitorData.prototype.getArchitecture = function() {
	return this.architecture;
}
HudsonMonitorData.prototype.getAverageResponseTime = function() {
	return this.averageResponseTime;
}
HudsonMonitorData.prototype.getDiskSpace = function() {
	return this.diskSpace;
}
