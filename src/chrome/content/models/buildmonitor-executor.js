/*****************************************************************
 * HudsonExecutor represents a build executor on a Hudson master/slave instance.
 */
function HudsonExecutor(
		executableNumber, executableUrl, isIdle, isLikelyStuck, number, progress, computerName) {
	this.executableNumber = executableNumber;
	this.executableUrl = executableUrl;
	this.isIdle = isIdle;
	this.isLikelyStuck = isLikelyStuck;
	this.number = number;
	this.progress = progress;
	this.computerName = computerName;
}
HudsonExecutor.prototype.getExecutableNumber = function() {
	return this.executableNumber;
}
HudsonExecutor.prototype.getExecutableUrl = function() {
	return this.executableUrl;
}
HudsonExecutor.prototype.getIdleStatus = function() {
	return this.isIdle;
}
HudsonExecutor.prototype.getLikelyStuckStatus = function() {
	return this.isLikelyStuck;
}
HudsonExecutor.prototype.getNumber = function() {
	return this.number;
}
HudsonExecutor.prototype.getProgress = function() {
	return this.progress;
}
HudsonExecutor.prototype.getComputerName = function() {
	return this.computerName;
}
HudsonExecutor.prototype.getDetails = function() {
	var details = null;
	if (this.isIdle == "true") {
		details = "Idle";
	} else {
		var executableName = new String(this.executableUrl.match("/job/[^/]+")).replace(/\/job\//, "");
		details = executableName + " #" + this.executableNumber;
	}
    details += " - " + this.computerName + "#" + (this.number + 1);
    return details;
}
HudsonExecutor.prototype.getStatus = function() {
	var status = "";
	if (this.isIdle == "true") {
		status = "idle";
	} else if (this.isLikelyStuck == "true") {
		status = "stuck";
	} else if (this.progress != "-1") {
		status = "running";
	}
	return status;
}