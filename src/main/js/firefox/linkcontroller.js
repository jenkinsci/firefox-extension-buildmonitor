function hudson_prepare() {
	linkWindow.prepare();
}
function hudson_saveLink() {
	linkWindow.save();
	var parent = window.arguments[0];
	parent.hudson_runAll();
}