var HudsonUi = Class.extend({
	init: function(localiser) {
		this.executorUiElementSet = new HudsonUiElementSet('executor');
		this.historicUiElementSet = new HudsonUiElementSet('historic');
		this.uiElementSets = new Array(this.executorUiElementSet, this.historicUiElementSet);
		this.localiser = localiser;
	},
	prepare: function(feeds) {
		var panelContainer = document.getElementById('hudson-panel-feeds');
		var tooltipContainer = document.getElementById('hudson-tooltip-feeds');
		var buildsPopupContainer = document.getElementById('hudson-menupopup-builds-feeds');
		var menusPopupContainer = document.getElementById('hudson-menupopup-menus-feeds');
		
		this.clear(panelContainer);
		this.clear(tooltipContainer);
		this.clear(buildsPopupContainer);
		this.clear(menusPopupContainer);
		
		// panel element ordering on the statusbar
		for (var i = 0; i < feeds.length; i++) {
			for (var j = 0; j < this.uiElementSets.length; j++) {
				this.uiElementSets[j].getPanel().prepare(panelContainer, new Array(feeds[i]));
			}
		}
		
		for (var i = 0; i < this.uiElementSets.length; i++) {
			this.uiElementSets[i].getTooltip().prepare(tooltipContainer, feeds);
			this.uiElementSets[i].getBuildsPopup().prepare(buildsPopupContainer, feeds);
			this.uiElementSets[i].getMenusPopup().prepare(menusPopupContainer, feeds);
		}
				
		for (var i = 0; i < feeds.length; i++) {
			this.setStatusQueued(feeds[i]);
			this.historicUiElementSet.getMenusPopup().set(this.historicUiElementSet.getPanel().getPanelElement(feeds[i]), feeds[i]);
		}
	},
	setStatusQueued: function(feed) {
		this.historicUiElementSet.getPanel().set('status/queued', feed);
		this.historicUiElementSet.getTooltip().set(
			this.historicUiElementSet.getPanel().getPanelElement(feed),
			new Array(this.localiser.getText('feed.queued.message1') + ' url: ' + feed.getUrl()),
			this.localiser.getText('feed.queued.title'),
			feed);
	},
	setStatusDownloading: function(feed) {
		this.historicUiElementSet.getPanel().set('status/downloading', feed);
		this.historicUiElementSet.getTooltip().set(
			this.historicUiElementSet.getPanel().getPanelElement(feed),
			new Array(
				this.localiser.getText('feed.process.downloading.message1') + ' url: ' + feed.getUrl(),
				this.localiser.getText('feed.process.downloading.message2')),
			this.localiser.getText('feed.process.downloading.title'),
			feed);
	},
	setStatusProcessed: function(feed, result) {
		var container = this.historicUiElementSet.getPanel().getPanelElement(feed);
		var builds = result.getBuilds();
		this.historicUiElementSet.getPanel().set('status/build/' + result.getStatus(), feed);
		this.historicUiElementSet.getBuildsPopup().set(container, feed, builds);
		this.historicUiElementSet.getTooltip().set(container, builds, result.getTitle(), feed);
	},
	clear: function(elem) {
		while (elem.firstChild) {
			elem.removeChild(elem.firstChild);
		}
	}
});