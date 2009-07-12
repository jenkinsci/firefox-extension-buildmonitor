var HudsonDownloaderCallback = Base.extend({
	constructor: function(type, parser, ui) {
		this.type = type;
		this.parser = parser;
		this.ui = ui;
	},
	process: function(xml, feed) {
		var result = this.parser.parse(xml);
		this.ui.setStatusProcessed(this.type, feed, result);
	},
	setStatusDownloading: function(feed) {
		this.ui.setStatusDownloading(this.type, feed);
	},
	setStatusDownloadError: function(feed) {
		this.ui.setStatusDownloadError(this.type, feed);
	}
});