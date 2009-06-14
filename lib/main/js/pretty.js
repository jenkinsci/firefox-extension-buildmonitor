/*
 * JavaScript Pretty Date
 * Copyright (c) 2008 John Resig (jquery.com)
 * Licensed under the MIT license.
 */

/*
 * Takes an ISO time and returns a string representing how long ago the date represents.
 * Slightly modified from original code (http://ejohn.org/blog/javascript-pretty-date/),
 * to work with UTC instead of current locale time, and to use localised texts.
 */
function prettyDateUTC(time) {
	var textMgr = new HudsonTextMgr();
	var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
		diff = (((getCurrentDateUTC()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);

	if (isNaN(day_diff)) {
		return (textMgr.get("date.isnan"));
	} else if (day_diff < 0) {
		return (textMgr.get("date.invalid"));
	} else if (day_diff >= 31) {
		return (textMgr.get("date.morethanamonth"));
	} else {
		return day_diff == 0 && (
				diff < 60 && textMgr.get("date.now") ||
				diff < 120 && textMgr.get("date.minute") ||
				diff < 3600 && textMgr.get("date.minutes", [Math.floor( diff / 60 )]) ||
				diff < 7200 && textMgr.get("date.hour") ||
				diff < 86400 && textMgr.get("date.hours", [Math.floor( diff / 3600 )])) ||
			day_diff == 1 && textMgr.get("date.day") ||
			day_diff < 7 && textMgr.get("date.days", [day_diff]) ||
			day_diff < 31 && textMgr.get("date.weeks", [Math.ceil( day_diff / 7 )]);
	}
}
function getCurrentDateUTC() {
	var date = new Date();
	var localTime = date.getTime();
	var localOffset = date.getTimezoneOffset() * 60000;
	return new Date(localTime + localOffset);
}