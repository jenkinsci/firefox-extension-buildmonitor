function hudson_initialise() {
	buildMonitor.prepare();
    addFeedWindow.setMenuVisibility();
    hudson_schedule();
}
function hudson_runAll() {
	buildMonitor.runAll();
}
function hudson_run(i) {
    buildMonitor.run(i);
}
function hudson_schedule() {
	hudson_runAll();
	var interval = preferences.getInterval();
	logger.debug(localiser.getText('monitor.schedule', [interval]));
	setTimeout('hudson_schedule()', interval * 60 * 1000);
}
function hudson_goToDashboard(i) {
	hudson_goTo(buildMonitor.getFeeds()[i].getDashboardUrl());
}
function hudson_goTo(url) {
	if (preferences.getOpenPage() == 'newtab') {
		getBrowser().addTab(url);
	} else {
		getBrowser().loadURI(url);
	}
}
function hudson_removeFeed(i) {
	buildMonitor.removeFeed(i);
	hudson_runAll();
}
function hudson_openAddFeedWindow(url) {
	window.openDialog('chrome://buildmonitor/content/addfeed.xul', 'addfeed', 'centerscreen,chrome,modal', this, url);
}
function hudson_openPreferencesWindow() {
	window.openDialog('chrome://buildmonitor/content/preferences.xul', 'preferences', 'centerscreen,chrome,modal', this);
}
window.addEventListener('load', function() {hudson_initialise();}, false);