/*****************************************************************
 * HudsonExecutorFeed contains executors feed details to be monitored.
 */
function HudsonExecutorFeed(id, name, url) {
	this.id = id;
	this.name = name;
	this.url = url;
}
HudsonExecutorFeed.prototype.getId = function() {
	return this.id;
}
HudsonExecutorFeed.prototype.getName = function() {
	return this.name;
}
HudsonExecutorFeed.prototype.getUrl = function() {
	return this.url;
}