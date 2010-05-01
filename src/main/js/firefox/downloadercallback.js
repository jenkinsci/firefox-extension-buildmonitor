org_hudsonci.DownloaderCallback = name_edwards_dean_Base.extend({
	constructor: function(type, parser, notifier, logger, localiser, ui) {
		this.type = type;
		this.parser = parser;
		this.notifier = notifier;
		this.logger = logger;
		this.localiser = localiser;
		this.ui = ui;
	},
	process: function(xml, feed) {
		this.logger.debug(this.localiser.getText('feed.process.ready.success') + ' ' + xml.substring(0, 100) + '...', feed);
		var result = this.parser.parse(xml);
		this.notifier.process(feed, result);
		this.ui.setStatusProcessed(this.type, feed, result);
	},
	setStatusDownloading: function(feed) {
		this.ui.setStatusDownloading(this.type, feed);
	},
	setStatusDownloadError: function(feed) {
		this.ui.setStatusDownloadError(this.type, feed);
	}
});