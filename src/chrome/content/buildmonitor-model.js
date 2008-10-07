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

/*****************************************************************
 * Build information from build history feed.
 */
function HistoryBuild(text, link, date) {
	this.text = text;
	this.link = link;
	this.date = date;
}
HistoryBuild.prototype.getText = function() {
    return this.text;
}
HistoryBuild.prototype.getLink = function() {
    return this.link;
}
HistoryBuild.prototype.getDate = function() {
    return this.date;
}
HistoryBuild.prototype.getDetails = function() {
    return this.text + " - " + prettyDateUTC(this.date);
}
HistoryBuild.prototype.getStatus = function() {
	var status = "";
	if (this.text.indexOf("(SUCCESS)") >= 0) {
		status = "success";
	} else if (this.text.indexOf("(FAILURE)") >= 0) {
		status = "failure";
	} else if (this.text.indexOf("(ABORTED)") >= 0 || this.text.indexOf("(NOT_BUILT)") >= 0) {
		status = "unknown";
	} else if (this.text.indexOf("(UNSTABLE)") >= 0) {
		status = "warning";
	}
	return status;
}
HistoryBuild.prototype.isFailure = function() {
	var isFailure = false;
	if (this.getStatus() == "failure") {
		isFailure = true;
	}
	return isFailure;
}
HistoryBuild.prototype.isSuccess = function() {
	var isSuccess = false;
	if (this.getStatus() == "success") {
		isSuccess = true;
	}
	return isSuccess;
}