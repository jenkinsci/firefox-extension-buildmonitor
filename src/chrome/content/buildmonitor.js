var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

var textMgr = new TextMgr();
var prefMgr = new PrefMgr(preferences);
var dateMgr = new DateMgr();
var logMgr = new LogMgr(console, prefMgr, dateMgr);
var uiMgr = new UIMgr(logMgr, textMgr);
var feedMgr = new FeedMgr(prefMgr, logMgr, uiMgr, textMgr);

/*
 * Build Monitor main functionalities, interfaces with the manager classes.
 */
var monitor = {
    init: function() {
        logMgr.debug(textMgr.get("monitor.init"));
        schedule();
    },
    schedule: function() {
		processFeed();
		var interval = prefMgr.getInterval();
		logMgr.debug(textMgr.get("monitor.schedule", [interval]));
		setTimeout("schedule()", interval * 60 * 1000);
    },
    loadPrefs: function() {
        var debug = prefMgr.getDebug();
        var interval = prefMgr.getInterval();
        var size = prefMgr.getSize();
        var url = prefMgr.getUrl();
        logMgr.debug(textMgr.get("monitor.loadprefs") + " debug: " + debug + ", interval: " + interval + ", size: " + size + ", url: " + url);
        document.getElementById("buildmonitor-prefs-debug").checked = debug;
        document.getElementById("buildmonitor-prefs-interval").value = interval;
        document.getElementById("buildmonitor-prefs-size").value = size;
        document.getElementById("buildmonitor-prefs-url").value = url;
    },
    savePrefs: function() {
        var debug = document.getElementById("buildmonitor-prefs-debug").checked;
        var interval = document.getElementById("buildmonitor-prefs-interval").value;
        var size = document.getElementById("buildmonitor-prefs-size").value;
        var url = document.getElementById("buildmonitor-prefs-url").value;
        logMgr.debug(textMgr.get("monitor.saveprefs") + " debug: " + debug + ", interval: " + interval + ", size: " + size + ", url: " + url);
        prefMgr.set(debug, interval, size, url);
    },
    processFeed: function() {
        var url = prefMgr.getUrl();
        if (url) {
            feedMgr.process(url);
        } else {
        	uiMgr.reset();
            uiMgr.setTooltipContent(textMgr.get("monitor.processfeed.failure.title"), new Array(textMgr.get("monitor.processfeed.failure.message1"), textMgr.get("monitor.processfeed.failure.message2")));
            uiMgr.setPanelIcon("nourl");
        }
    },
    goToDashboard: function() {
    	var url = prefMgr.getUrl();
    	if (url) {
			getBrowser().addTab(url.match("^.+/"));
		} else {
			uiMgr.setTooltipContent(textMgr.get("monitor.gotodashboard.failure.title"), new Array(textMgr.get("monitor.gotodashboard.failure.message1"), textMgr.get("monitor.gotodashboard.failure.message2")));
			uiMgr.setPanelIcon("error");
		}
    }
}

/*
 * Convenient functions for XUL components to call.
 */
function initialise() {
    monitor.init();
}
function schedule() {
    monitor.schedule();
}
function loadPreferences() {
    monitor.loadPrefs();
}
function savePreferences() {
    monitor.savePrefs();
    return true;
}
function processFeed() {
    monitor.processFeed();
}
function goToDashboard() {
	monitor.goToDashboard();
}
window.addEventListener("load", function() {initialise();}, false);