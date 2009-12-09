function hudson_submit() {
	var parent = window.arguments[0];
	parent.hudson_runAll();
}
function hudson_initView() {
    document.documentElement.getButton('accept').hidden = false;
    feedsTree.initView();
}
function hudson_updateView(event) {
    feedsTree.updateView(event);
}
function hudson_saveView() {
    feedsTree.saveView();
    return true;
}