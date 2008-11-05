/*****************************************************************
 * Convenient functions for prefs XUL component to call.
 */
function hudson_initPreferences() {
	treeMgr.initView();
}
function hudson_savePreferences() {
	treeMgr.saveView();
    return true;
}
function hudson_removeFeedFromView(i) {
	treeMgr.removeFeedFromView(i);
}