var feeds;

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
		feeds = new Array(
			new Feed(0, "netb", "http://deadlock.netbeans.org/hudson/rssAll", true),
			new Feed(1, "n/a", "http://inexistant", true),
			new Feed(2, "jbos", "http://hudson.jboss.org/hudson/rssAll", true),
			new Feed(3, "dumm", "ftp://hoho", true),
			new Feed(4, "s-db", "http://hudson.jboss.org/hudson/job/hibernate-testsuite-db/rssAll"),
			new Feed(5, "prot", "ftpx://hoho", true)
			);
		uiMgr.initFeedsPanel(feeds);
		for(var i = 0; i < feeds.length; i++) {
			feedMgr.process(feeds[i]);
		}
    },
    processFeed: function(i) {
    	feedMgr.process(feeds[i]);
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
function processFeed(i) {
    monitor.processFeed(i);
}
window.addEventListener("load", function() {initialise();}, false);