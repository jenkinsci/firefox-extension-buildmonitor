org_hudsonci.submit = function() {
	var parent = window.arguments[0];
	parent.hudson_runAll();
}
org_hudsonci.initView = function() {
    document.documentElement.getButton('accept').hidden = false;
    feedsTree.initView();
}
org_hudsonci.updateView = function(event) {
    feedsTree.updateView(event);
}
org_hudsonci.saveView = function() {
    feedsTree.saveView();
    return true;
}