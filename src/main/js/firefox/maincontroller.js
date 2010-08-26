org_hudsonci.initialise = function() {
    org_hudsonci_buildMonitorManager.getPreferences().upgrade();
	org_hudsonci_buildMonitorManager.getBuildMonitor().prepare();
    org_hudsonci_buildMonitorManager.getAddFeedWindow().setMenuVisibility();
    org_hudsonci.schedule();
};
org_hudsonci.runAll = function() {
	org_hudsonci_buildMonitorManager.getBuildMonitor().runAll();
};
org_hudsonci.run = function(i) {
    org_hudsonci_buildMonitorManager.getBuildMonitor().run(i);
};
org_hudsonci.schedule = function() {
	org_hudsonci.runAll();
	var interval = org_hudsonci_buildMonitorManager.getPreferences().getInterval();
	org_hudsonci_buildMonitorManager.getLogger().debug(org_hudsonci_buildMonitorManager.getLocaliser().getText('monitor.schedule', [interval]));
    var callback = { notify: function(ffTimerService) { org_hudsonci.schedule(); } };
    org_hudsonci_buildMonitorManager.getScheduler().schedule(callback, interval);
};
org_hudsonci.goToDashboard = function(i) {
	org_hudsonci.goTo(org_hudsonci_buildMonitorManager.getBuildMonitor().getFeeds()[i].getDashboardUrl());
};
org_hudsonci.goTo = function(url) {
	if (org_hudsonci_buildMonitorManager.getPreferences().getOpenPage() === 'newtab') {
		getBrowser().addTab(url);
	} else {
		getBrowser().loadURI(url);
	}
};
org_hudsonci.build = function(i) {
	org_hudsonci.goTo(org_hudsonci_buildMonitorManager.getBuildMonitor().getFeeds()[i].getBuildUrl());
};
org_hudsonci.removeFeed = function(i) {
	org_hudsonci_buildMonitorManager.getBuildMonitor().removeFeed(i);
	org_hudsonci.runAll();
};
org_hudsonci_openAddFeedWindow = function(url) {
	window.openDialog('chrome://buildmonitor/content/addfeed.xul', 'addfeed', 'centerscreen,chrome,modal', this, url);
};
org_hudsonci_openPreferencesWindow = function() {
	window.openDialog('chrome://buildmonitor/content/preferences.xul', 'preferences', 'centerscreen,chrome,modal', this);
};
window.addEventListener('load', function() {org_hudsonci.initialise();}, false);