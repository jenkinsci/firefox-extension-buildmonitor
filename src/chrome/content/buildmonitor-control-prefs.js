/*****************************************************************
 * Convenient functions for prefs XUL component to call.
 */
function hudson_initView() {
	treeMgr.initView();
}
function hudson_saveView() {
	treeMgr.saveView();
    return true;
}
function hudson_updateView(event) {
	treeMgr.updateView(event);
}
function hudson_removeFeedFromView(i) {
	treeMgr.removeFeedFromView(i);
}