/*****************************************************************
 * ComputerSet contains executors details to be monitored.
 */
function ComputerSet(id, name, url) {
	this.id = id;
	this.name = name;
	this.url = url;
}
ComputerSet.prototype.getId = function() {
	return this.id;
}
ComputerSet.prototype.getName = function() {
	return this.name;
}
ComputerSet.prototype.getUrl = function() {
	return this.url;
}