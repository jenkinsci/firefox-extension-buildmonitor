/*****************************************************************
 * LinkMgr handles adding Hudson feed link to the Build Monitor.
 */
function LinkMgr(uiMgr, feedMgr, prefMgr) {
	this.uiMgr = uiMgr;
	this.feedMgr = feedMgr;
	this.prefMgr = prefMgr;
}
LinkMgr.prototype.initMenu = function() {
	var contextMenu = document.getElementById("contentAreaContextMenu");
	if (contextMenu) {
		contextMenu.addEventListener("popupshowing", this.setMenuVisibility, false);
	}
}
LinkMgr.prototype.setMenuVisibility = function() {
	if (gContextMenu) {
		document.getElementById("hudson-context-menu-addlink").hidden = !(gContextMenu.onLink && !gContextMenu.onMailtoLink);
	}
}
LinkMgr.prototype.initLink = function() {
	feeds = prefMgr.getFeeds();
	if (prefMgr.iCanHazFeedburger()) {
		document.getElementById("hudson-link-full").hidden = true;
		document.getElementById("hudson-link-add").hidden = false;
		
		var url = window.arguments[1];
		document.getElementById("hudson-link-name").value = this.getNameRecommendation(url);
		document.getElementById("hudson-link-url").value = url;
	} else {
		document.getElementById("hudson-link-full").hidden = false;
		document.getElementById("hudson-link-add").hidden = true;
	}
}
LinkMgr.prototype.saveLink = function() {
	var name = document.getElementById("hudson-link-name").value;
	var url = document.getElementById("hudson-link-url").value;
	prefMgr.addFeed(name, url);
}
LinkMgr.prototype.getNameRecommendation = function(url) {
	var name = "";
	if (url.match("/job/")) {
		name = new String(url.match("/job/[^/]+")).replace(/\/job\//, "");
	} else if (url.match("http://")) {
		name = new String(url.match("http://[^/]+")).replace(/http:\/\//, "");
	}
	return name;
}