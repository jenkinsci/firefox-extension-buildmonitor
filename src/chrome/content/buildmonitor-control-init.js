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
var treeMgr = new TreeMgr(prefMgr);
var logMgr = new LogMgr(console, prefMgr, dateMgr);
var uiMgr = new UIMgr(logMgr, textMgr, prefMgr);
var feedMgr = new FeedMgr(uiMgr, notificationMgr, prefMgr);
var linkMgr = new LinkMgr(uiMgr, feedMgr, prefMgr);