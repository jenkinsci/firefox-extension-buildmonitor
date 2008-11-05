var feeds;

var alerts = Components.classes["@mozilla.org/alerts-service;1"].getService(Components.interfaces.nsIAlertsService);
var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
var io = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
var sound = Components.classes["@mozilla.org/sound;1"].createInstance(Components.interfaces.nsISound);

var dateMgr = new DateMgr();
var textMgr = new TextMgr();
var notificationMgr = new NotificationMgr(sound, io, alerts);
var prefMgr = new PrefMgr(preferences);
var logMgr = new LogMgr(console, prefMgr, dateMgr);
var uiMgr = new UIMgr(logMgr, textMgr, prefMgr);
var feedMgr = new FeedMgr(uiMgr, notificationMgr, prefMgr);
var linkMgr = new LinkMgr(uiMgr, feedMgr, prefMgr);

/*****************************************************************
 * Build Monitor main functionalities, interfaces with the manager classes.
 */
var monitor = {
    init: function() {
        logMgr.debug(textMgr.get("monitor.init"));
        prefMgr.upgrade();
        linkMgr.initMenu();
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
    openLink: function(url) {
    	window.openDialog('chrome://buildmonitor/content/link.xul', 'link', 'centerscreen,chrome,modal', url);
    },
    initLink: function() {
    	linkMgr.initLink();
    },
    saveLink: function() {
    	linkMgr.saveLink();
    },
    openPrefs: function() {
    	window.openDialog('chrome://buildmonitor/content/prefs.xul', 'prefs', 'centerscreen,chrome,modal');
    },
    initPrefs: function() {
    	prefMgr.initView();
    },
    savePrefs: function() {
    	prefMgr.saveView();
    },
    removeFeedFromView: function(i) {
    	prefMgr.removeFeedFromView(i);
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
function hudson_openLink(url) {
	monitor.openLink(url);
}
function hudson_initLink() {
	monitor.initLink();
}
function hudson_saveLink() {
	monitor.saveLink();
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
function hudson_removeFeedFromView(i) {
    monitor.removeFeedFromView(i);
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