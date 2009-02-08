/*****************************************************************
 * Node is a computer within Hudson master/slave set up.
 */
function Node(
		displayName, isIdle, isOffline, nodeData) {
	this.displayName = displayName;
	this.isIdle = isIdle;
	this.isOffline = isOffline;
	this.nodeData = nodeData;
}
Node.prototype.getDisplayName = function() {
	return this.displayName;
}
Node.prototype.isIdle = function() {
	return this.isIdle;
}
Node.prototype.isOffline = function() {
	return this.isOffline;
}
Node.prototype.getNodeData = function() {
	return this.nodeData;
}