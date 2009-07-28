var HudsonBuildMonitor = Base.extend({
	constructor: function(preferences, ui, downloader, logger, localiser, preferences) {
		this.preferences = preferences;
		this.ui = ui;
		this.downloader = downloader;
		this.logger = logger;
		this.localiser = localiser;
		this.preferences = preferences;
		this.feeds = null;
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

		var size = this.preferences.getSize();
		var feedStatusType = this.preferences.getFeedStatusType();
		this.executorCallback = new HudsonDownloaderCallback(TYPE_EXECUTOR, new HudsonExecutorFeedParser(size), this.ui);
		this.historicCallback = new HudsonDownloaderCallback(TYPE_HISTORIC, new HudsonHistoricFeedParser(size, feedStatusType), this.ui);
		for (var i = 0; i < this.feeds.length; i++) {
			if (!this.feeds[i].isIgnored()) {
				this.run(i);
			}
		}
	},
	removeFeed: function(i) {
		this.preferences.removeFeed(this.feeds[i]);
	},
	run: function(i) {
		downloader.download(this.executorCallback, this.feeds[i].getExecutorUrl(), this.feeds[i], this.preferences.getNetworkUsername(), this.preferences.getNetworkPassword());
		downloader.download(this.historicCallback, this.feeds[i].getUrl(), this.feeds[i], this.preferences.getNetworkUsername(), this.preferences.getNetworkPassword());
	}
});