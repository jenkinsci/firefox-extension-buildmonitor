/*****************************************************************
 * MonitorData keeps information related to the computer.
 */
function MonitorData(
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
MonitorData.prototype.getPhysicalMemory = function() {
	return (this.availablePhysicalMemory != null && this.totalPhysicalMemory)
		? prettyBytes(this.availablePhysicalMemory) + "/" + prettyBytes(this.totalPhysicalMemory)
		: null;
}
MonitorData.prototype.getSwapSpace = function() {
	return (this.availableSwapSpace != null && this.totalSwapSpace != null)
		? prettyBytes(this.availableSwapSpace) + "/" + prettyBytes(this.totalSwapSpace)
		: null;
}
MonitorData.prototype.getArchitecture = function() {
	return this.architecture;
}
MonitorData.prototype.getAverageResponseTime = function() {
	return this.averageResponseTime;
}
MonitorData.prototype.getDiskSpace = function() {
	return this.diskSpace;
}
