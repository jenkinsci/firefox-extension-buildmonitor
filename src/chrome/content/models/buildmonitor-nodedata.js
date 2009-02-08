/*****************************************************************
 * NodeData keeps information related to the node.
 */
function NodeData(
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
NodeData.prototype.getPhysicalMemory = function() {
	return (this.availablePhysicalMemory != null && this.totalPhysicalMemory)
		? prettyBytes(this.availablePhysicalMemory) + "/" + prettyBytes(this.totalPhysicalMemory)
		: null;
}
NodeData.prototype.getSwapSpace = function() {
	return (this.availableSwapSpace != null && this.totalSwapSpace != null)
		? prettyBytes(this.availableSwapSpace) + "/" + prettyBytes(this.totalSwapSpace)
		: null;
}
NodeData.prototype.getArchitecture = function() {
	return this.architecture;
}
NodeData.prototype.getAverageResponseTime = function() {
	return this.averageResponseTime;
}
NodeData.prototype.getDiskSpace = function() {
	return this.diskSpace;
}
