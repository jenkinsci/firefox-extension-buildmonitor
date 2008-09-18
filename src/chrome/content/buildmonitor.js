var feeds;

var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

var dateMgr = new DateMgr();
var textMgr = new TextMgr();
var prefMgr = new PrefMgr(preferences, feeds);
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
		feeds = new Array();
		feeds[0] = new Feed(0, "netb", "http://deadlock.netbeans.org/hudson/rssAll", true);
		feeds[1] = new Feed(1, "n/a", "http://inexistant", true);
		feeds[2] = new Feed(2, "jbos", "http://hudson.jboss.org/hudson/rssAll", true);
		feeds[3] = new Feed(3, "dumm", "ftp://hoho", true);
		feeds[4] = new Feed(4, "s-db", "http://hudson.jboss.org/hudson/job/hibernate-testsuite-db/rssAll");
		feeds[5] = new Feed(5, "prot", "ftpx://hoho", true);
		feeds[6] = new Feed(6, "", "");
		uiMgr.initFeedsPanel(feeds);
		feedMgr.processAll(feeds);
    },
    openPrefs: function() {
    	window.openDialog('chrome://buildmonitor/content/prefs.xul', 'prefs', 'centerscreen,chrome,modal');
    },
    initPrefs: function() {
    	prefMgr.loadFeeds();
        var debug = prefMgr.getDebug();
        var interval = prefMgr.getInterval();
        var size = prefMgr.getSize();
        logMgr.debug(textMgr.get("monitor.loadprefs") + " debug: " + debug + ", interval: " + interval + ", size: " + size);
        document.getElementById("buildmonitor-prefs-debug").checked = debug;
        document.getElementById("buildmonitor-prefs-interval").value = interval;
        document.getElementById("buildmonitor-prefs-size").value = size;
    },
    savePrefs: function() {
        var debug = document.getElementById("buildmonitor-prefs-debug").checked;
        var interval = document.getElementById("buildmonitor-prefs-interval").value;
        var size = document.getElementById("buildmonitor-prefs-size").value;
        logMgr.debug(textMgr.get("monitor.saveprefs") + " debug: " + debug + ", interval: " + interval + ", size: " + size);
        prefMgr.set(debug, interval, size);
    },
    processAll: function() {
    	feedMgr.processAll(feeds);
    },
    process: function(i) {
    	feedMgr.process(feeds[i]);
    },
    goToDashboard: function(i) {
		getBrowser().addTab(feeds[i].getUrl().match("^.+/"));
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
function openPreferences() {
	monitor.openPrefs();
}
function initPreferences() {
    monitor.initPrefs();
}
function savePreferences() {
    monitor.savePrefs();
    return true;
}
function processAll() {
    monitor.processAll();
}
function process(i) {
    monitor.process(i);
}
function goToDashboard(i) {
	monitor.goToDashboard(i);
}
window.addEventListener("load", function() {initialise();}, false);