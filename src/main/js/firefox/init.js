var NUM_OF_FEEDS = 2;

var alertsService = Components.classes['@mozilla.org/alerts-service;1'].getService(Components.interfaces.nsIAlertsService);
var consoleService = Components.classes['@mozilla.org/consoleservice;1'].getService(Components.interfaces.nsIConsoleService);
var ioService = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
var preferencesService = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
var soundService = Components.classes['@mozilla.org/sound;1'].createInstance(Components.interfaces.nsISound);

var util = new HudsonUtil();
var localiser = new HudsonLocaliser();
var preferences = new HudsonPreferences(preferencesService, NUM_OF_FEEDS);
var logger = new HudsonLogger(consoleService, util, preferences.getDebug());
var panel = new HudsonPanel();
var tooltip = new HudsonTooltip();
var buildsPopup = new HudsonBuildsPopup();
var menusPopup = new HudsonMenusPopup(localiser);
var ui = new HudsonUi(panel, tooltip, buildsPopup, menusPopup, localiser);
var downloader = new HudsonDownloader();
var buildMonitor = new HudsonBuildMonitor(preferences, ui, downloader, logger, localiser);