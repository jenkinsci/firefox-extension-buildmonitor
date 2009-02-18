/*****************************************************************
 * Feed to be monitored.
 */
function Feed(id, name, url) {
	this.id = id;
	this.name = name;
	this.url = url;
	this.computerSet = null;
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
Feed.prototype.clear = function() {
	this.setName("");
	this.setUrl("");
}
Feed.prototype.isIgnored = function() {
	var isIgnored = true;
	if (this.url != null && this.url.length > 0) {
		isIgnored = false;
	}
	return isIgnored;
}
Feed.prototype.isEmpty = function() {
	var isEmpty = false;
	if ((this.name == null || this.name.length == 0) && (this.url == null || this.url.length == 0)) {
		isEmpty = true;
	}
	return isEmpty;
}
Feed.prototype.isJob = function() {
	var isJob = false;
	if (this.url.match("/job/")) {
		isJob = true;
	}
	return isJob;
}
Feed.prototype.getComputerSet = function() {
	return this.computerSet;
}
Feed.prototype.hasComputerSet = function() {
	return (this.computerSet != null);
}
Feed.prototype.initComputerSet = function() {
	this.computerSet = new ComputerSet(this.id, this.name, 'http://hudson.zones.apache.org/hudson/computer/api/xml?depth=1');
}