function hudson_initialise() {
	buildMonitor.prepare();
    //prefMgr.upgrade();
    linkWindow.setMenuVisibility();
    hudson_schedule();
}
function hudson_runAll() {
	buildMonitor.runAll();
	//uiMgr.initFeedsPanel(feeds);
	//feedMgr.processAll(feeds);
	alert('end of hudson run');
}
function hudson_run(i) {
    buildMonitor.run(i);
}
function hudson_schedule() {
	hudson_runAll();
	//var interval = prefMgr.getInterval();
	//logMgr.debug(textMgr.get('monitor.schedule', [interval]));
	//setTimeout('hudson_schedule()', interval * 60 * 1000);
}
function hudson_goToDashboard(i) {
	hudson_goTo(buildMonitor.getFeeds()[i].getDashboardUrl());
}
function hudson_goTo(url) {
	// TODO: pref handling here
	//if (prefMgr.getOpenPage() == "newtab") {
		getBrowser().addTab(url);
	//} else {
	//	getBrowser().loadURI(url);
	//}
}
function hudson_removeFeed(i) {
	buildMonitor.removeFeed(i);
	hudson_runAll();
/*
	prefMgr.removeFeed(feeds[i]);
	uiMgr.removePanel(feeds[i]);
	if (feeds[i].hasExecutorFeed()) {
		uiMgr.removePanel(feeds[i].getExecutorFeed());
	}
*/
}
function hudson_openLinkWindow(url) {
	window.openDialog('chrome://buildmonitor/content/link.xul', 'link', 'centerscreen,chrome,modal', this, url);
}
window.addEventListener('load', function() {hudson_initialise();}, false);