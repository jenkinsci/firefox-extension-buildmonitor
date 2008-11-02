var feeds;

var alerts = Components.classes["@mozilla.org/alerts-service;1"].getService(Components.interfaces.nsIAlertsService);
var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
var io = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
var sound = Components.classes["@mozilla.org/sound;1"].createInstance(Components.interfaces.nsISound);

var dateMgr = new DateMgr();
var textMgr = new TextMgr();
var notificationMgr = new NotificationMgr(sound, io, alerts);
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
        prefMgr.upgrade();
        hudson_schedule();
    },
    run: function() {
		feeds = prefMgr.getFeeds();
		uiMgr.initFeedsPanel(feeds);
		feedMgr.processAll(feeds);
	},
    schedule: function() {
		hudson_run();
		var interval = prefMgr.getInterval();
		logMgr.debug(textMgr.get("monitor.schedule", [interval]));
		setTimeout("hudson_schedule()", interval * 60 * 1000);
    },
    openPrefs: function() {
    	window.openDialog('chrome://buildmonitor/content/prefs.xul', 'prefs', 'centerscreen,chrome,modal');
    },
    initPrefs: function() {
    	prefMgr.initView();
        var debug = prefMgr.getDebug();
        var successColor = prefMgr.getSuccessColor();
        var feedStatusType = prefMgr.getFeedStatusType();
        var interval = prefMgr.getInterval();
        var openPage = prefMgr.getOpenPage();
        var size = prefMgr.getSize();
        var sound = prefMgr.getSound();
        var alert = prefMgr.getAlert();
        logMgr.debug(textMgr.get("monitor.loadprefs") + " debug: " + debug + ", successColor: " + successColor + ", feedStatusType: " + feedStatusType + ", interval: " + interval + ", openPage: " + openPage + ", size: " + size + ", sound: " + sound + ", alert: " + alert);
        document.getElementById("buildmonitor-prefs-debug").checked = debug;
        document.getElementById("buildmonitor-prefs-successcolor").value = successColor;
        document.getElementById("buildmonitor-prefs-feedstatustype").value = feedStatusType;
        document.getElementById("buildmonitor-prefs-interval").value = interval;
        document.getElementById("buildmonitor-prefs-openpage").value = openPage;
        document.getElementById("buildmonitor-prefs-size").value = size;
        document.getElementById("buildmonitor-prefs-sound").checked = sound;
        document.getElementById("buildmonitor-prefs-alert").checked = alert;
    },
    savePrefs: function() {
        var debug = document.getElementById("buildmonitor-prefs-debug").checked;
        var successColor = document.getElementById("buildmonitor-prefs-successcolor").value;
		var feedStatusType = document.getElementById("buildmonitor-prefs-feedstatustype").value;
        var interval = document.getElementById("buildmonitor-prefs-interval").value;
        var openPage = document.getElementById("buildmonitor-prefs-openpage").value;
        var size = document.getElementById("buildmonitor-prefs-size").value;
        var sound = document.getElementById("buildmonitor-prefs-sound").checked;
        var alert = document.getElementById("buildmonitor-prefs-alert").checked;
        logMgr.debug(textMgr.get("monitor.saveprefs") + " debug: " + debug + ", successColor: " + successColor + ", feedStatusType: " + feedStatusType + ", interval: " + interval + ", openPage: " + openPage + ", size: " + size + ", sound: " + sound + ", alert: " + alert);
        prefMgr.set(debug, successColor, feedStatusType, interval, openPage, size, sound, alert);
    },
    processAll: function() {
    	feedMgr.processAll(feeds);
    },
    process: function(i) {
    	feedMgr.process(feeds[i]);
    },
    removeFeed: function(i) {
    	prefMgr.removeFeed(feeds[i]);
    	uiMgr.removePanel(feeds[i]);
    },
    goToDashboard: function(i) {
    	hudson_goTo(feeds[i].getUrl().match("^.+/"));
    },
    goTo: function(url) {
    	if (prefMgr.getOpenPage() == "newtab") {
			getBrowser().addTab(url);
		} else {
			getBrowser().loadURI(url);
		}
    }
}
/*****************************************************************
 * Convenient functions for XUL components to call.
 */
function hudson_initialise() {
    monitor.init();
}
function hudson_run() {
    monitor.run();
}
function hudson_schedule() {
    monitor.schedule();
}
function hudson_openPreferences() {
	monitor.openPrefs();
}
function hudson_initPreferences() {
    monitor.initPrefs();
}
function hudson_savePreferences() {
    monitor.savePrefs();
    return true;
}
function hudson_processAll() {
    monitor.processAll();
}
function hudson_process(i) {
    monitor.process(i);
}
function hudson_removeFeed(i) {
	monitor.removeFeed(i);
}
function hudson_goToDashboard(i) {
	monitor.goToDashboard(i);
}
function hudson_goTo(url) {
	monitor.goTo(url);
}
window.addEventListener("load", function() {hudson_initialise();}, false);