function hudson_initialise() {
	buildMonitor.prepare();
    linkWindow.setMenuVisibility();
    hudson_schedule();
}
function hudson_runAll() {
	buildMonitor.runAll();
	alert('FIN');
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
function hudson_openLinkWindow(url) {
	window.openDialog('chrome://buildmonitor/content/link.xul', 'link', 'centerscreen,chrome,modal', this, url);
}
window.addEventListener('load', function() {hudson_initialise();}, false);