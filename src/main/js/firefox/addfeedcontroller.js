org_hudsonci.prepare = function() {
	org_hudsonci_buildMonitorManager.getAddFeedWindow().prepare();
};
org_hudsonci.submit = function() {
	org_hudsonci_buildMonitorManager.getAddFeedWindow().save();
	var parent = window.arguments[0];
	parent.org_hudsonci_buildMonitorManager.getBuildMonitor().runAll();
};