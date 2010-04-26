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
    var callback = { notify: function(ffTimerService) { org_hudsonci.schedule(); } }
    scheduler.schedule(callback, interval);
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
org_hudsonci_openAddFeedWindow = function(url) {
	window.openDialog('chrome://buildmonitor/content/addfeed.xul', 'addfeed', 'centerscreen,chrome,modal', this, url);
}
org_hudsonci_openPreferencesWindow = function() {
	window.openDialog('chrome://buildmonitor/content/preferences.xul', 'preferences', 'centerscreen,chrome,modal', this);
}
window.addEventListener('load', function() {org_hudsonci.initialise();}, false);