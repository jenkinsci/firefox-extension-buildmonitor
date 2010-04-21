org_hudsonci.submit = function() {
	var parent = window.arguments[0];
	parent.buildMonitor.runAll();
};
org_hudsonci.initView = function() {
    document.documentElement.getButton('accept').hidden = false;
    document.getElementById('buildmonitor-prefs-networkpassword').value = preferences.getNetworkPassword();
    feedsTree.initView();
};
org_hudsonci.updateView = function(event) {
    feedsTree.updateView(event);
};
org_hudsonci.saveView = function() {
    var networkUsername = document.getElementById('buildmonitor-prefs-networkusername').value;
    var networkPassword = document.getElementById('buildmonitor-prefs-networkpassword').value;
    preferences.setNetworkPassword(networkUsername, networkPassword);
    feedsTree.saveView();
    return true;
};