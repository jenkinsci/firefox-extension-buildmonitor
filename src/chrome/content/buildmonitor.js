var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

var dateMgr = new DateMgr();
var textMgr = new TextMgr();
var prefMgr = new PrefMgr(preferences);
var logMgr = new LogMgr(console, prefMgr, dateMgr);
var uiMgr = new UIMgr(logMgr, textMgr);
var feedMgr = new FeedMgr(uiMgr, prefMgr);

/*****************************************************************
 * Build Monitor main functionalities, interfaces with the manager classes.
 */
var monitor = {
    init: function() {
        logMgr.debug(textMgr.get("monitor.init"));
        schedule();
    },
    schedule: function() {
		var feeds = new Array(
			new Feed(0, "netb", "", true),
			new Feed(1, "n/a", "http://na", true),
			new Feed(2, "jbos", "http://", true),
			new Feed(3, "dumm", "ftp://hohoho", true),
			new Feed(4, "s-db", "http://"),
			new Feed(5, "prot", "ftpx://hohoho", true)
			);
		uiMgr.initFeedsPanel(feeds);
		feedMgr.process(feeds);
    }
}
/*****************************************************************
 * Convenient functions for XUL components to call.
 */
function initialise() {
    monitor.init();
}
function schedule() {
    monitor.schedule();
}
window.addEventListener("load", function() {initialise();}, false);