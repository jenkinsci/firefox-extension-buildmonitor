org_hudsonci.prepare = function() {
	addFeedWindow.prepare();
}
org_hudsonci.submit = function() {
	addFeedWindow.save();
	var parent = window.arguments[0];
	parent.buildMonitor.runAll();
}