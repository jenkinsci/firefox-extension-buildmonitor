org_hudsonci.submit = function() {
	var parent = window.arguments[0];
	parent.org_hudsonci_buildMonitorManager.getBuildMonitor().runAll();
};
org_hudsonci.initView = function() {
    document.documentElement.getButton('accept').hidden = false;
    document.getElementById('buildmonitor-prefs-networkpassword').value = org_hudsonci_buildMonitorManager.getPreferences().getNetworkPassword();
    org_hudsonci_buildMonitorManager.getFeedsTree().initView();
};
org_hudsonci.updateView = function(event) {
    org_hudsonci_buildMonitorManager.getFeedsTree().updateView(event);
};
org_hudsonci.saveView = function() {
    var networkUsername = document.getElementById('buildmonitor-prefs-networkusername').value;
    var networkPassword = document.getElementById('buildmonitor-prefs-networkpassword').value;
    org_hudsonci_buildMonitorManager.getPreferences().setNetworkPassword(networkUsername, networkPassword);
    org_hudsonci_buildMonitorManager.getFeedsTree().saveView();
    return true;
};