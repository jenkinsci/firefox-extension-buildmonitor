function hudson_prepare() {
	addFeedWindow.prepare();
}
function hudson_submit() {
	addFeedWindow.save();
	var parent = window.arguments[0];
	parent.hudson_runAll();
}