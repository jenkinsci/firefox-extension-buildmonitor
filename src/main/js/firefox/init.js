const NUM_OF_FEEDS = 15;

var loggerService = new HudsonLoggerService(Components.classes['@mozilla.org/consoleservice;1'].getService(Components.interfaces.nsIConsoleService));
var preferencesService = new HudsonPreferencesService(Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch));
var notificationService = new HudsonNotificationService(Components.classes['@mozilla.org/alerts-service;1'].getService(Components.interfaces.nsIAlertsService), Components.classes['@mozilla.org/sound;1'].createInstance(Components.interfaces.nsISound), Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService));

var util = new HudsonUtil();
var localiser = new HudsonLocaliser();
var preferences = new HudsonPreferences(preferencesService, NUM_OF_FEEDS);
var logger = new HudsonLogger(loggerService, util, preferences);
var notification = new HudsonNotification(notificationService, preferences);
var ui = new HudsonUi(localiser, preferences);
var downloader = new HudsonDownloader();
var addFeedWindow = new HudsonAddFeedWindow(util, preferences);
var buildMonitor = new HudsonBuildMonitor(preferences, ui, downloader, logger, localiser, notification);