/*****************************************************************
 * HudsonTextMgr retrieves text from string bundle.
 */
function HudsonTextMgr() {
}
HudsonTextMgr.prototype.get = function(key, args) {
	var texts = document.getElementById("hudson-stringbundle");
	var text;
	if (args) {
		text = texts.getFormattedString(key, args);
	} else {
		text = texts.getString(key);
	}
	return text;
}