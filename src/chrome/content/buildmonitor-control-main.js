/*****************************************************************
 * Convenient functions for main XUL component to call.
 */
function hudson_initialise() {
    logMgr.debug(textMgr.get("monitor.init"));
    prefMgr.upgrade();
    linkMgr.initMenu();
    hudson_schedule();
}
function hudson_run() {
	feeds = prefMgr.getFeeds();
	uiMgr.initFeedsPanel(feeds);
	feedMgr.processAll(feeds);
}
function hudson_schedule() {
	hudson_run();
	var interval = prefMgr.getInterval();
	logMgr.debug(textMgr.get("monitor.schedule", [interval]));
	setTimeout("hudson_schedule()", interval * 60 * 1000);
}
function hudson_openLink(url) {
	window.openDialog('chrome://buildmonitor/content/link.xul', 'link', 'centerscreen,chrome,modal', this, url);
}
function hudson_openPreferences() {
	window.openDialog('chrome://buildmonitor/content/prefs.xul', 'prefs', 'centerscreen,chrome,modal', this);
}
function hudson_processAll() {
    feedMgr.processAll(feeds);
}
function hudson_process(i) {
    feedMgr.process(feeds[i]);
}
function hudson_removeFeed(i) {
	prefMgr.removeFeed(feeds[i]);
	uiMgr.removePanel(feeds[i]);
	if (feeds[i].hasExecutorFeed()) {
		uiMgr.removePanel(feeds[i].getExecutorFeed());
	}
}
function hudson_goToDashboard(i) {
	hudson_goTo(feeds[i].getUrl().match("^.+/"));
}
function hudson_build(i) {
	hudson_goTo(new String(feeds[i].getUrl().match(".*/job/[^/]+")) + "/build?delay=0sec");
}
function hudson_goTo(url) {
	if (prefMgr.getOpenPage() == "newtab") {
		getBrowser().addTab(url);
	} else {
		getBrowser().loadURI(url);
	}
}
window.addEventListener("load", function() {hudson_initialise();}, false);