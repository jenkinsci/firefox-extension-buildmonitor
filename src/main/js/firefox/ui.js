var HudsonUi = Class.extend({
	init: function(localiser) {
		this.executorUiElementSet = new HudsonUiElementSet(TYPE_EXECUTOR);
		this.historicUiElementSet = new HudsonUiElementSet(TYPE_HISTORIC);
		this.uiElementSets = new Array(this.executorUiElementSet, this.historicUiElementSet);
		this.localiser = localiser;
		this.uiUtil = new HudsonUiUtil();
	},
	prepare: function(feeds) {
		var panelContainer = document.getElementById('hudson-panel-feeds');
		var tooltipContainer = document.getElementById('hudson-tooltip-feeds');
		var buildsPopupContainer = document.getElementById('hudson-menupopup-builds-feeds');
		var menusPopupContainer = document.getElementById('hudson-menupopup-menus-feeds');
		
		this.uiUtil.clear(panelContainer);
		this.uiUtil.clear(tooltipContainer);
		this.uiUtil.clear(buildsPopupContainer);
		this.uiUtil.clear(menusPopupContainer);

		for (var i = 0; i < this.uiElementSets.length; i++) {
			this.uiElementSets[i].getTooltip().prepare(tooltipContainer, feeds);
			this.uiElementSets[i].getBuildsPopup().prepare(buildsPopupContainer, feeds);
			this.uiElementSets[i].getMenusPopup().prepare(menusPopupContainer, feeds);
		}
				
		// panel element ordering on the statusbar
		for (var i = 0; i < feeds.length; i++) {
			if (!feeds[i].isIgnored()) {
				for (var j = 0; j < this.uiElementSets.length; j++) {
					this.uiElementSets[j].getPanel().prepare(panelContainer, new Array(feeds[i]));
				}
				this._setStatusQueued(TYPE_EXECUTOR, feeds[i]);
				this._setStatusQueued(TYPE_HISTORIC, feeds[i]);
				for (var j = 0; j < this.uiElementSets.length; j++) {
					var container = this.uiElementSets[j].getPanel().getPanelElement(feeds[i]);
					this.uiElementSets[j].getMenusPopup().set(container, feeds[i]);
				}
			}
		}
	},
	setStatusDownloading: function(type, feed) {
		this._getUiElementSet(type).getPanel().set('status/downloading', feed);
		// TODO pass url via param, don't assume it's the feed's url
		this._getUiElementSet(type).getTooltip().set(
			this._getUiElementSet(type).getPanel().getPanelElement(feed),
			new Array(
				this.localiser.getText('feed.process.downloading.message1') + ' url: ' + feed.getUrl(),
				this.localiser.getText('feed.process.downloading.message2')),
			this.localiser.getText('feed.process.downloading.title'),
			feed);
	},
	setStatusProcessed: function(type, feed, result) {
		var container = this._getUiElementSet(type).getPanel().getPanelElement(feed);
		var builds = result.getBuilds();
		this._getUiElementSet(type).getPanel().set('status/' + this.uiUtil.getStatusSkinType(type) + '/' + result.getStatus(), feed);
		this._getUiElementSet(type).getBuildsPopup().set(container, feed, builds);
		this._getUiElementSet(type).getTooltip().set(container, builds, result.getTitle(), feed);
	},
	_setStatusQueued: function(type, feed) {
		this._getUiElementSet(type).getPanel().set('status/queued', feed);
		this._getUiElementSet(type).getTooltip().set(
			this.historicUiElementSet.getPanel().getPanelElement(feed),
			new Array(this.localiser.getText('feed.queued.message1') + ' url: ' + feed.getUrl()),
			this.localiser.getText('feed.queued.title'),
			feed);
	},
	_getUiElementSet: function(type) {
		var uiElementSet;
		if (type == TYPE_EXECUTOR) {
			uiElementSet = this.executorUiElementSet;
		} else {
			uiElementSet = this.historicUiElementSet;
		}
		return uiElementSet;
	}
});