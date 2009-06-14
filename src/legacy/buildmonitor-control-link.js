/*****************************************************************
 * Convenient functions for link XUL component to call.
 */
function hudson_initLink() {
	linkMgr.initLink();
}
function hudson_saveLink() {
	linkMgr.saveLink();
}
function hudson_refreshStatusBar() {
	var parent = window.arguments[0];
	parent.hudson_run();
}