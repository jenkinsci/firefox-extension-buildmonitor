var HudsonBuildMonitor = Base.extend({
	constructor: function(preferences, ui, downloader, logger, localiser) {
		this.preferences = preferences;
		this.ui = ui;
		this.downloader = downloader;
		this.logger = logger;
		this.localiser = localiser;
		this.feeds = null;
		
		// TODO pull the 20 from preferences
		// TODO pull status type from preferences
		this.executorCallback = new HudsonDownloaderCallback(TYPE_EXECUTOR, new HudsonExecutorFeedParser(20), this.ui);
		this.historicCallback = new HudsonDownloaderCallback(TYPE_HISTORIC, new HudsonHistoricFeedParser(20, 'overall'), this.ui);
	},
	getFeeds: function() {
		return this.feeds;
	},
	prepare: function() {
		localiser.setBundle(document.getElementById('hudson-stringbundle'));
		logger.debug(localiser.getText('monitor.init'));
	},
	runAll: function() {
		this.feeds = preferences.getFeeds();
		this.ui.prepare(this.feeds);
		
		for (var i = 0; i < this.feeds.length; i++) {
			this.run(i);
		}
	},
	run: function(i) {
		downloader.download(this.executorCallback, this.feeds[i].getExecutorUrl(), this.feeds[i]);
		downloader.download(this.historicCallback, this.feeds[i].getUrl(), this.feeds[i]);
	}
});