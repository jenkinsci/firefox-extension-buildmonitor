org_hudsonci.initialise = function() {
	buildMonitor.prepare();
    addFeedWindow.setMenuVisibility();
    org_hudsonci.schedule();
}
org_hudsonci.runAll = function() {
	buildMonitor.runAll();
}
org_hudsonci.run = function(i) {
    buildMonitor.run(i);
}
org_hudsonci.schedule = function() {
	org_hudsonci.runAll();
	var interval = preferences.getInterval();
	logger.debug(localiser.getText('monitor.schedule', [interval]));
	setTimeout('org_hudsonci.schedule()', interval * 60 * 1000);
}
org_hudsonci.goToDashboard = function(i) {
	org_hudsonci.goTo(buildMonitor.getFeeds()[i].getDashboardUrl());
}
org_hudsonci.goTo = function(url) {
	if (preferences.getOpenPage() == 'newtab') {
		getBrowser().addTab(url);
	} else {
		getBrowser().loadURI(url);
	}
}
org_hudsonci.build = function(i) {
	org_hudsonci.goTo(buildMonitor.getFeeds()[i].getBuildUrl());
}
org_hudsonci.removeFeed = function(i) {
	buildMonitor.removeFeed(i);
	org_hudsonci.runAll();
}
function hudson_openAddFeedWindow(url) {
	window.openDialog('chrome://buildmonitor/content/addfeed.xul', 'addfeed', 'centerscreen,chrome,modal', this, url);
}
function hudson_openPreferencesWindow() {
	window.openDialog('chrome://buildmonitor/content/preferences.xul', 'preferences', 'centerscreen,chrome,modal', this);
}
window.addEventListener('load', function() {org_hudsonci.initialise();}, false);