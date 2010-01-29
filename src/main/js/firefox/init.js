const NUM_OF_FEEDS = 15;

var loggerService = new org_hudsonci.LoggerService(Components.classes['@mozilla.org/consoleservice;1'].getService(Components.interfaces.nsIConsoleService));
var preferencesService = new org_hudsonci.PreferencesService(Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch));
var notificationService = new org_hudsonci.NotificationService(Components.classes['@mozilla.org/alerts-service;1'].getService(Components.interfaces.nsIAlertsService), Components.classes['@mozilla.org/sound;1'].createInstance(Components.interfaces.nsISound), Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService));

var util = new org_hudsonci.Util();
var localiser = new org_hudsonci.Localiser();
var preferences = new org_hudsonci.Preferences(preferencesService, NUM_OF_FEEDS);
var feedsTree = new org_hudsonci.FeedsTree(preferences, NUM_OF_FEEDS);
var logger = new org_hudsonci.Logger(loggerService, util, preferences);
var notification = new org_hudsonci.Notification(notificationService, preferences);
var ui = new org_hudsonci.Ui(localiser, preferences);
var downloader = new org_hudsonci.Downloader();
var addFeedWindow = new org_hudsonci.AddFeedWindow(util, preferences);
var buildMonitor = new org_hudsonci.BuildMonitor(preferences, ui, downloader, logger, localiser, notification);