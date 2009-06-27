var HudsonBuildMonitor = Class.extend({
	init: function(preferences, ui, downloader, logger, localiser) {
		this.preferences = preferences;
		this.ui = ui;
		this.downloader = downloader;
		this.logger = logger;
		this.localiser = localiser;
		this.feeds = null;
	},
	loadFeeds: function() {
		this.feeds = preferences.getFeeds();
	},
	getFeeds: function() {
		return this.feeds;
	},
	prepare: function() {
		localiser.setBundle(document.getElementById('hudson-stringbundle'));
		logger.debug(localiser.getText('monitor.init'));
	},
	run: function() {
		this.loadFeeds();
		this.ui.prepare(this.feeds);
		
		// TODO pull the 20 from preferences
		// TODO pull status type from preferences
		var executorParser = new HudsonExecutorFeedParser(20);
		var historicParser = new HudsonHistoricFeedParser(20, 'overall');
		var executorCallback = new HudsonDownloaderCallback(TYPE_EXECUTOR, executorParser, this.ui);
		var historicCallback = new HudsonDownloaderCallback(TYPE_HISTORIC, historicParser, this.ui);
		for (var i = 0; i < this.feeds.length; i++) {
			downloader.download(executorCallback, this.feeds[i].getExecutorUrl(), this.feeds[i]);
			downloader.download(historicCallback, this.feeds[i].getUrl(), this.feeds[i]);
		}
	}
});