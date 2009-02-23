var feeds;

var alerts = Components.classes["@mozilla.org/alerts-service;1"].getService(Components.interfaces.nsIAlertsService);
var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
var io = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
var sound = Components.classes["@mozilla.org/sound;1"].createInstance(Components.interfaces.nsISound);

var dateMgr = new HudsonDateMgr();
var textMgr = new HudsonTextMgr();
var prefMgr = new HudsonPrefMgr(preferences);
var treeMgr = new HudsonTreeMgr(prefMgr);
var logMgr = new HudsonLogMgr(console, prefMgr, dateMgr);
var uiMgr = new HudsonUIMgr(logMgr, textMgr, prefMgr);
var notificationMgr = new HudsonNotificationMgr(sound, io, alerts, prefMgr);
var feedMgr = new HudsonFeedMgr(uiMgr, notificationMgr, prefMgr);
var linkMgr = new HudsonLinkMgr(uiMgr, feedMgr, prefMgr);