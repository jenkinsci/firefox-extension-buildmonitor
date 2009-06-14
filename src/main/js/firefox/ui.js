var HudsonUi = Class.extend({
	init: function(panel, tooltip, menusPopup, localiser) {
		this.panel = panel;
		this.tooltip = tooltip;
		this.menusPopup = menusPopup;
		this.localiser = localiser;
	},
	prepare: function(feeds) {
		//this.feedsPanel = document.getElementById('hudson-panel-feeds');
		//this.feedsTooltip = document.getElementById('hudson-tooltip-feeds');
		//this.feedsBuildsMenupopup = document.getElementById('hudson-menupopup-builds-feeds');
		//this.feedsPrefsMenupopup = document.getElementById('hudson-menupopup-menus-feeds');

		//this.uiUtil.clear(this.feedsPanel);
		//this.uiUtil.clear(this.feedsTooltip);
		//this.uiUtil.clear(this.feedsBuildsMenupopup);
		//this.uiUtil.clear(this.feedsPrefsMenupopup);
		
		this.panel.prepare(feeds);
		this.tooltip.prepare(feeds);
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
	}
});