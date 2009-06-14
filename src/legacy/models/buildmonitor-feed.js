/*****************************************************************
 * HudsonFeed to be monitored.
 */
function HudsonFeed(id, name, url) {
	this.id = id;
	this.name = name;
	this.url = url;
	this.executorFeed = null;
}
HudsonFeed.prototype.getId = function() {
	return this.id;
}
HudsonFeed.prototype.getName = function() {
	return this.name;
}
HudsonFeed.prototype.getUrl = function() {
	return this.url;
}
HudsonFeed.prototype.setName = function(name) {
	this.name = name;
}
HudsonFeed.prototype.setUrl = function(url) {
	this.url = url;
}
HudsonFeed.prototype.clear = function() {
	this.setName("");
	this.setUrl("");
}
HudsonFeed.prototype.isIgnored = function() {
	var isIgnored = true;
	if (this.url != null && this.url.length > 0) {
		isIgnored = false;
	}
	return isIgnored;
}
HudsonFeed.prototype.isEmpty = function() {
	var isEmpty = false;
	if ((this.name == null || this.name.length == 0) && (this.url == null || this.url.length == 0)) {
		isEmpty = true;
	}
	return isEmpty;
}
HudsonFeed.prototype.isJob = function() {
	var isJob = false;
	if (this.url.match("/job/")) {
		isJob = true;
	}
	return isJob;
}
HudsonFeed.prototype.getExecutorFeed = function() {
	return this.executorFeed;
}
HudsonFeed.prototype.hasExecutorFeed = function() {
	return (this.executorFeed != null);
}
HudsonFeed.prototype.initExecutorFeed = function() {
	var executorFeedUrl = null;
	if (this.url != null && this.url != "") {
		 executorFeedUrl = this.url.replace(/\/rss.*/, "").replace(/\/job.*/, "") + "/computer/api/xml?depth=1";
	}
	this.executorFeed = new HudsonExecutorFeed(this.id, this.name, executorFeedUrl);
}