function hudson_prepare() {
	linkWindow.prepare();
}
function hudson_saveLink() {
	//linkMgr.saveLink();
}
function hudson_refreshStatusBar() {
	var parent = window.arguments[0];
	parent.hudson_runAll();
}