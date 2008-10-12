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
        prefMgr.foo();
        schedule();
    },
    run: function() {
		feeds = prefMgr.getFeeds();
		uiMgr.initFeedsPanel(feeds);
		feedMgr.processAll(feeds);
	},
    schedule: function() {
		run();
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
    goToDashboard: function(i) {
    	goTo(feeds[i].getUrl().match("^.+/"));
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
function initialise() {
    monitor.init();
}
function run() {
    monitor.run();
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