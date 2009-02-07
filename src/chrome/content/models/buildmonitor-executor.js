/*****************************************************************
 * Executor to be monitored.
 */
function Executor(id, name, url) {
	this.id = id;
	this.name = name;
	this.url = url;
}
Executor.prototype.getId = function() {
	return this.id;
}
Executor.prototype.getName = function() {
	return this.name;
}
Executor.prototype.getUrl = function() {
	return this.url;
}