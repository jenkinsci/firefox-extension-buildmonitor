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
		this.downloader.setCaller(this);
		localiser.setBundle(document.getElementById('hudson-stringbundle'));
		logger.debug(localiser.getText('monitor.init'));
	},
	run: function() {
		this.loadFeeds();
		ui.prepare(this.feeds);
		for (var i = 0; i < this.feeds.length; i++) {
			downloader.download(this.feeds[i]);
		}
	},
	process: function(xml, feed) {
		// TODO pull the 20 from preferences
		// TODO pull status type from preferences
		var parser = new HudsonHistoricFeedParser(xml, 20, 'overall');
		var result = parser.parse();
		this.ui.setStatusProcessed(feed, result);
	},
	setStatusDownloading: function(feed) {
		this.ui.setStatusDownloading(feed);
	}
});