/*****************************************************************
 * Feed to be monitored.
 */
function Feed(id, code, url, isEnabled) {
	this.id = id;
	this.code = code;
	this.url = url;
	this.isEnabled = isEnabled;
}
Feed.prototype.getId = function() {
	return this.id;
}
Feed.prototype.getCode = function() {
	return this.code;
}
Feed.prototype.getUrl = function() {
	return this.url;
}
Feed.prototype.isEnabled = function() {
	return this.isEnabled;
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
HistoryBuild.prototype.isSuccess = function() {
	var isSuccess = false;
	if (this.getStatus() == "success") {
		isSuccess = true;
	}
	return isSuccess;
}