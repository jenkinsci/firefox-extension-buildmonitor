/*****************************************************************
 * Feed to be monitored.
 */
function Feed(id, name, url) {
	this.id = id;
	this.name = name;
	this.url = url;
}
Feed.prototype.getId = function() {
	return this.id;
}
Feed.prototype.getName = function() {
	return this.name;
}
Feed.prototype.getUrl = function() {
	return this.url;
}
Feed.prototype.setName = function(name) {
	this.name = name;
}
Feed.prototype.setUrl = function(url) {
	this.url = url;
}
Feed.prototype.isIgnored = function() {
	var isIgnored = true;
	if (this.url != null && this.url.length > 0) {
		isIgnored = false;
	}
	return isIgnored;
}