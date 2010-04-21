var NUM_OF_FEEDS = 15;

var ffAlertsService = Components.classes['@mozilla.org/alerts-service;1'].getService(Components.interfaces.nsIAlertsService);
var ffConsoleService = Components.classes['@mozilla.org/consoleservice;1'].getService(Components.interfaces.nsIConsoleService);
var ffIoService = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
var ffLoginManager = Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager);
var ffLoginInfo = new Components.Constructor('@mozilla.org/login-manager/loginInfo;1', Components.interfaces.nsILoginInfo, 'init');
var ffPreferencesService = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
var ffSound = Components.classes['@mozilla.org/sound;1'].createInstance(Components.interfaces.nsISound);
var ffTimer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);

var loggerService = new org_hudsonci.LoggerService(ffConsoleService);
var preferencesService = new org_hudsonci.PreferencesService(ffPreferencesService);
var accountService = new org_hudsonci.AccountService(ffLoginManager, ffLoginInfo, 'chrome://buildmonitor');
var notificationService = new org_hudsonci.NotificationService(ffAlertsService, ffSound, ffIoService);
var schedulerService = new org_hudsonci.SchedulerService(ffTimer);

var util = new org_hudsonci.Util();
var localiser = new org_hudsonci.Localiser();
var account = new org_hudsonci.Account(accountService);
var preferences = new org_hudsonci.Preferences(preferencesService, NUM_OF_FEEDS, account);
var scheduler = new org_hudsonci.Scheduler(schedulerService);
var feedsTree = new org_hudsonci.FeedsTree(preferences, NUM_OF_FEEDS);
var logger = new org_hudsonci.Logger(loggerService, util, preferences);
var notification = new org_hudsonci.Notification(notificationService, preferences);
var ui = new org_hudsonci.Ui(localiser, preferences);
var downloader = new org_hudsonci.Downloader();
var addFeedWindow = new org_hudsonci.AddFeedWindow(util, preferences);
var buildMonitor = new org_hudsonci.BuildMonitor(preferences, ui, downloader, logger, localiser, notification);