org_hudsonci.BuildMonitorManager = name_edwards_dean_Base.extend({
    constructor: function(numOfFeeds) {
        this.numOfFeeds = numOfFeeds;

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

        this.util = new org_hudsonci.Util();
        this.localiser = new org_hudsonci.Localiser();
        this.account = new org_hudsonci.Account(accountService);
        this.preferences = new org_hudsonci.Preferences(preferencesService, this.numOfFeeds, this.account);
        this.scheduler = new org_hudsonci.Scheduler(schedulerService);
        this.feedsTree = new org_hudsonci.FeedsTree(this.preferences, this.numOfFeeds);
        this.logger = new org_hudsonci.Logger(loggerService, this.util, this.preferences);
        this.notification = new org_hudsonci.Notification(notificationService, this.preferences);
        this.ui = new org_hudsonci.Ui(this.localiser, this.preferences);
        this.downloader = new org_hudsonci.Downloader();
        this.addFeedWindow = new org_hudsonci.AddFeedWindow(this.util, this.preferences);
        this.buildMonitor = new org_hudsonci.BuildMonitor(this.preferences, this.ui, this.downloader, this.logger, this.localiser, this.notification);
    },
    getBuildMonitor: function() {
        return this.buildMonitor;
    },
    getAddFeedWindow: function() {
        return this.addFeedWindow;
    },
    getLocaliser: function() {
        return this.localiser;
    },
    getPreferences: function() {
        return this.preferences;
    },
    getScheduler: function() {
        return this.scheduler;
    },
    getFeedsTree: function() {
        return this.feedsTree;
    },
    getLogger: function() {
        return this.logger;
    },
    getUtil: function() {
        return this.util;
    }
});
var org_hudsonci_buildMonitorConst = new org_hudsonci.Const();
var org_hudsonci_buildMonitorManager = new org_hudsonci.BuildMonitorManager(15);