/*****************************************************************
 * DateMgr provides date manipulation convenience methods.
 */
function DateMgr() {
}
DateMgr.prototype.getDebugDate = function() {
	return (new Date()).toLocaleString();
}