function hudson_initialise() {
	buildMonitor.prepare();
    //prefMgr.upgrade();
    //linkMgr.initMenu();
    hudson_schedule();
}
function hudson_run() {
	buildMonitor.run();
	//uiMgr.initFeedsPanel(feeds);
	//feedMgr.processAll(feeds);
	alert('end of hudson run');
}
function hudson_schedule() {
	hudson_run();
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
window.addEventListener('load', function() {hudson_initialise();}, false);