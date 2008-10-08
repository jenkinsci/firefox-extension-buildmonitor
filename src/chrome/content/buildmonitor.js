var feeds;

var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
var io = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
var sound = Components.classes["@mozilla.org/sound;1"].createInstance(Components.interfaces.nsISound);

var dateMgr = new DateMgr();
var textMgr = new TextMgr();
var notificationMgr = new NotificationMgr(sound, io);
var prefMgr = new PrefMgr(preferences, feeds);
var logMgr = new LogMgr(console, prefMgr, dateMgr);
var uiMgr = new UIMgr(logMgr, textMgr, prefMgr);
var feedMgr = new FeedMgr(uiMgr, notificationMgr, prefMgr);

/*****************************************************************
 * Build Monitor main functionalities, interfaces with the manager classes.
 */
var monitor = {
    init: function() {
        logMgr.debug(textMgr.get("monitor.init"));
        schedule();
    },
    schedule: function() {
		feeds = prefMgr.getFeeds();
		uiMgr.initFeedsPanel(feeds);
		feedMgr.processAll(feeds);
		
		var interval = prefMgr.getInterval();
		logMgr.debug(textMgr.get("monitor.schedule", [interval]));
		setTimeout("schedule()", interval * 60 * 1000);
    },
    openPrefs: function() {
    	window.openDialog('chrome://buildmonitor/content/prefs.xul', 'prefs', 'centerscreen,chrome,modal');
    },
    initPrefs: function() {
    	prefMgr.initView();
        var debug = prefMgr.getDebug();
        var successColor = prefMgr.getSuccessColor();
        var interval = prefMgr.getInterval();
        var newTab = prefMgr.getNewTab();
        var size = prefMgr.getSize();
        var sound = prefMgr.getSound();
        logMgr.debug(textMgr.get("monitor.loadprefs") + " debug: " + debug + ", successColor: " + successColor + ", interval: " + interval + ", newTab: " + newTab + ", size: " + size + ", sound: " + sound);
        document.getElementById("buildmonitor-prefs-debug").checked = debug;
        document.getElementById("buildmonitor-prefs-successcolor").value = successColor;
        document.getElementById("buildmonitor-prefs-interval").value = interval;
        document.getElementById("buildmonitor-prefs-newtab").checked = newTab;
        document.getElementById("buildmonitor-prefs-size").value = size;
        document.getElementById("buildmonitor-prefs-sound").checked = sound;
    },
    savePrefs: function() {
        var debug = document.getElementById("buildmonitor-prefs-debug").checked;
        var successColor = document.getElementById("buildmonitor-prefs-successcolor").value;
        var interval = document.getElementById("buildmonitor-prefs-interval").value;
        var newTab = document.getElementById("buildmonitor-prefs-newtab").checked;
        var size = document.getElementById("buildmonitor-prefs-size").value;
        var sound = document.getElementById("buildmonitor-prefs-sound").checked;
        logMgr.debug(textMgr.get("monitor.saveprefs") + " debug: " + debug + ", successColor: " + successColor + ", interval: " + interval + ", newTab: " + newTab + ", size: " + size + ", sound: " + sound);
        prefMgr.set(debug, successColor, interval, newTab, size, sound);
    },
    processAll: function() {
    	feedMgr.processAll(feeds);
    },
    process: function(i) {
    	feedMgr.process(feeds[i]);
    },
    goToDashboard: function(i) {
    	goTo(feeds[i].getUrl().match("^.+/"));
    },
    goTo: function(url) {
    	if (prefMgr.getNewTab()) {
			getBrowser().addTab(url);
		} else {
			getBrowser().loadURI(url);
		}
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
function goTo(url) {
	monitor.goTo(url);
}
window.addEventListener("load", function() {initialise();}, false);