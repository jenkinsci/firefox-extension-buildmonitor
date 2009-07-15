const NUM_OF_FEEDS = 15;
const TYPE_EXECUTOR = 'executor';
const TYPE_HISTORIC = 'historic';

var alertsService = Components.classes['@mozilla.org/alerts-service;1'].getService(Components.interfaces.nsIAlertsService);
var firefoxLoggerService = new HudsonLoggerService(Components.classes['@mozilla.org/consoleservice;1'].getService(Components.interfaces.nsIConsoleService));
var ioService = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
var firefoxPreferencesService = new HudsonPreferencesService(Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch));
var soundService = Components.classes['@mozilla.org/sound;1'].createInstance(Components.interfaces.nsISound);

var util = new HudsonUtil();
var localiser = new HudsonLocaliser();
var preferences = new HudsonPreferences(firefoxPreferencesService, NUM_OF_FEEDS);
var logger = new HudsonLogger(firefoxLoggerService, util, preferences);
var ui = new HudsonUi(localiser);
var downloader = new HudsonDownloader();
var addFeedWindow = new HudsonAddFeedWindow(util, preferences);
var buildMonitor = new HudsonBuildMonitor(preferences, ui, downloader, logger, localiser);