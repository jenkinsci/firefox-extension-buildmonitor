/*****************************************************************
 * HudsonDateMgr provides date manipulation convenience methods.
 */
function HudsonDateMgr() {
}
HudsonDateMgr.prototype.getDebugDate = function() {
	return (new Date()).toLocaleString();
}