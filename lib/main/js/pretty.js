/*
 * JavaScript Pretty Date
 * Copyright (c) 2008 John Resig (jquery.com)
 * Licensed under the MIT license.
 */

/*
 * Returns a string represention of how long ago the specified date was.
 * Slightly modified from original code (http://ejohn.org/blog/javascript-pretty-date/)
 * to use localised texts.
 * NOTE: this relies on the existence of localiser var (HudsonLocaliser).
 */
function prettyDateUTC(date) {
	diff = (((getCurrentDateUTC()).getTime() - date.getTime()) / 1000),
	day_diff = Math.floor(diff / 86400);
	if (isNaN(day_diff)) {
		return (localiser.getText("date.isnan"));
	} else if (day_diff < 0) {
		return (localiser.getText("date.invalid"));
	} else if (day_diff >= 31) {
		return (localiser.getText("date.morethanamonth"));
	} else {
		return day_diff == 0 && (
				diff < 60 && localiser.getText("date.now") ||
				diff < 120 && localiser.getText("date.minute") ||
				diff < 3600 && localiser.getText("date.minutes", [Math.floor( diff / 60 )]) ||
				diff < 7200 && localiser.getText("date.hour") ||
				diff < 86400 && localiser.getText("date.hours", [Math.floor( diff / 3600 )])) ||
			day_diff == 1 && localiser.getText("date.day") ||
			day_diff < 7 && localiser.getText("date.days", [day_diff]) ||
			day_diff < 31 && localiser.getText("date.weeks", [Math.ceil( day_diff / 7 )]);
	}
}
function getCurrentDateUTC() {
	var date = new Date();
	var localTime = date.getTime();
	var localOffset = date.getTimezoneOffset() * 60000;
	return new Date(localTime + localOffset);
}