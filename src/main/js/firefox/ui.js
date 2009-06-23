var HudsonUi = Class.extend({
	init: function(panel, tooltip, buildsPopup, menusPopup, localiser) {
		this.panel = panel;
		this.tooltip = tooltip;
		this.buildsPopup = buildsPopup;
		this.menusPopup = menusPopup;
		this.localiser = localiser;
	},
	prepare: function(feeds) {
		this.panel.prepare(feeds);
		this.tooltip.prepare(feeds);
		this.buildsPopup.prepare(feeds);
		this.menusPopup.prepare(feeds);
		
		for (var i = 0; i < feeds.length; i++) {
			this.setStatusQueued(feeds[i]);
			this.menusPopup.set(this.panel.getPanelElement(feeds[i]), feeds[i]);
		}
	},
	setStatusQueued: function(feed) {
		this.panel.set('status/queued', feed);
		this.tooltip.set(
			this.panel.getPanelElement(feed),
			new Array(this.localiser.getText('feed.queued.message1') + ' url: ' + feed.getUrl()),
			this.localiser.getText('feed.queued.title'),
			feed);
	},
	setStatusDownloading: function(feed) {
		this.panel.set('status/downloading', feed);
		this.tooltip.set(
			this.panel.getPanelElement(feed),
			new Array(
				this.localiser.getText('feed.process.downloading.message1') + ' url: ' + feed.getUrl(),
				this.localiser.getText('feed.process.downloading.message2')),
			this.localiser.getText('feed.process.downloading.title'),
			feed);
	},
	setStatusProcessed: function(feed, result) {
		var container = this.panel.getPanelElement(feed);
		var builds = result.getBuilds();
		this.panel.set('status/build/' + result.getStatus(), feed);
		this.buildsPopup.set(container, feed, builds);
		this.tooltip.set(container, builds, result.getTitle(), feed);
	}
});