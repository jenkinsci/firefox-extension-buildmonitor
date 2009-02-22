/*****************************************************************
 * Build information from build history feed.
 */
function HudsonHistoryBuild(text, link, date) {
	this.text = text;
	this.link = link;
	this.date = date;
}
HudsonHistoryBuild.prototype.getText = function() {
    return this.text;
}
HudsonHistoryBuild.prototype.getLink = function() {
    return this.link;
}
HudsonHistoryBuild.prototype.getDate = function() {
    return this.date;
}
HudsonHistoryBuild.prototype.getDetails = function() {
    return this.text + " - " + prettyDateUTC(this.date);
}
HudsonHistoryBuild.prototype.getStatus = function() {
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
HudsonHistoryBuild.prototype.isFailure = function() {
	var isFailure = false;
	if (this.getStatus() == "failure") {
		isFailure = true;
	}
	return isFailure;
}
HudsonHistoryBuild.prototype.isSuccess = function() {
	var isSuccess = false;
	if (this.getStatus() == "success") {
		isSuccess = true;
	}
	return isSuccess;
}