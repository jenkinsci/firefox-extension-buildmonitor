var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

var prefMgr = new PrefMgr(preferences);
var dateMgr = new DateMgr();
var logMgr = new LogMgr(console, prefMgr, dateMgr);
var uiMgr = new UIMgr(logMgr);
var feedMgr = new FeedMgr(prefMgr, logMgr, uiMgr);

/*
 * Build Monitor main functionalities, interfaces with the manager classes.
 */
var monitor = {
    init: function() {
        logMgr.debug("Initialising monitor.");
        schedule();
    },
    schedule: function() {
		processFeed();
		var interval = prefMgr.getInterval();
		logMgr.debug("Scheduling next feed retrieval in " + interval + " minute(s).");
		setTimeout("schedule()", interval * 60 * 1000);
    },
    loadPrefs: function() {
        var debug = prefMgr.getDebug();
        var interval = prefMgr.getInterval();
        var size = prefMgr.getSize();
        var url = prefMgr.getUrl();
        logMgr.debug("Loading preferences. debug: " + debug + ", interval: " + interval + ", size: " + size + ", url: " + url);
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
        logMgr.debug("Saving preferences. debug: " + debug + ", interval: " + interval + ", size: " + size + ", url: " + url);
        prefMgr.set(debug, interval, size, url);
    },
    processFeed: function() {
        var url = prefMgr.getUrl();
        if (url) {
            logMgr.debug("Retrieving feed. url: " + url);
            feedMgr.process(url);
        } else {
        	uiMgr.reset();
            uiMgr.setTooltipContent("Inactive", new Array("Unable to process feed.", "Please check the feed URL via Preferences menu."));
            uiMgr.setPanelIcon("nourl");
        }
    },
    goToDashboard: function() {
    	var url = prefMgr.getUrl();
    	if (url) {
			getBrowser().addTab(url.match("^.+/"));
		} else {
			uiMgr.setTooltipContent("Note", new Array("Unable to open Hudson Dashboard.", "Please check the feed URL via Preferences menu."));
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