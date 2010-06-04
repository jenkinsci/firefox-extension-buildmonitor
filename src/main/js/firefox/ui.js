org_hudsonci.Ui = name_edwards_dean_Base.extend({
	constructor: function(localiser, preferences) {
		this.localiser = localiser;
		this.preferences = preferences;
		this.uiUtil = new org_hudsonci.UiUtil();
		this.executorUiElementSet = new org_hudsonci.UiElementSet(org_hudsonci_buildMonitorConst.TYPE_EXECUTOR(), this.localiser);
		this.historicUiElementSet = new org_hudsonci.UiElementSet(org_hudsonci_buildMonitorConst.TYPE_HISTORIC(), this.localiser);
		this.uiElementSets = [this.executorUiElementSet, this.historicUiElementSet];
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

		// panel element ordering on the statusbar
		for (var i = 0; i < feeds.length; i++) {
			if (!feeds[i].isIgnored()) {
				for (var j = 0; j < this.uiElementSets.length; j++) {
					this.uiElementSets[j].getTooltip().prepare(tooltipContainer, feeds[i]);
					this.uiElementSets[j].getBuildsPopup().prepare(buildsPopupContainer, feeds[i]);
					this.uiElementSets[j].getMenusPopup().prepare(menusPopupContainer, feeds[i]);
					this.uiElementSets[j].getPanel().prepare(panelContainer, feeds[i], this.preferences.getHideName());
				}
				if (this.preferences.getExecutor() && !feeds[i].isJob()) {
					this._setStatusQueued(org_hudsonci_buildMonitorConst.TYPE_EXECUTOR(), feeds[i]);
				}
				this._setStatusQueued(org_hudsonci_buildMonitorConst.TYPE_HISTORIC(), feeds[i]);
				for (var k = 0; k < this.uiElementSets.length; k++) {
					var container = this.uiElementSets[k].getPanel().getPanelElement(feeds[i]);
					this.uiElementSets[k].getMenusPopup().set(container, feeds[i]);
				}
			}
		}
	},
	setStatusDownloading: function(type, feed) {
		this._getUiElementSet(type).getPanel().set('status/downloading', feed);
		this._getUiElementSet(type).getTooltip().set(
			this._getUiElementSet(type).getPanel().getPanelElement(feed),
			[
				this.localiser.getText('feed.process.downloading.message1'),
				'url: ' + this.uiUtil.getUrl(type, feed),
				this.localiser.getText('feed.process.downloading.message2')
		    ],
			this.localiser.getText('feed.process.downloading.title'),
			feed,
			this.preferences.getSuccessColor());
		// reset builds popup
		var container = this._getUiElementSet(type).getPanel().getPanelElement(feed);
		this._getUiElementSet(type).getBuildsPopup().set(container, feed, [], this.preferences.getSuccessColor());
	},
	setStatusDownloadError: function(type, feed) {
		var uiElementSet = this._getUiElementSet(type);
		uiElementSet.getPanel().set('status/error', feed);
		uiElementSet.getTooltip().set(
			this.historicUiElementSet.getPanel().getPanelElement(feed),
			[this.localiser.getText('feed.process.error.message'), 'url: ' + this.uiUtil.getUrl(type, feed)],
			this.localiser.getText('feed.process.error.title'),
			feed,
			this.preferences.getSuccessColor());
	},
	setStatusProcessed: function(type, feed, result) {
		var container = this._getUiElementSet(type).getPanel().getPanelElement(feed);
		var builds = result.getBuilds();
		this._getUiElementSet(type).getPanel().set('status/' + this.uiUtil.getStatusSkinType(type) + '/' + this.uiUtil.getVisualStatus(result.getStatus(), this.preferences.getSuccessColor()), feed);
		this._getUiElementSet(type).getBuildsPopup().set(container, feed, builds, this.preferences.getSuccessColor());
		this._getUiElementSet(type).getTooltip().set(container, builds, result.getTitle(), feed, this.preferences.getSuccessColor());
	},
	_setStatusQueued: function(type, feed) {
		this._getUiElementSet(type).getPanel().set('status/queued', feed);
		this._getUiElementSet(type).getTooltip().set(
			this._getUiElementSet(type).getPanel().getPanelElement(feed),
			[this.localiser.getText('feed.queued.message'), 'url: ' + this.uiUtil.getUrl(type, feed)],
			this.localiser.getText('feed.queued.title'),
			feed,
			this.preferences.getSuccessColor());
	},
	_getUiElementSet: function(type) {
		var uiElementSet;
		if (type == org_hudsonci_buildMonitorConst.TYPE_EXECUTOR()) {
			uiElementSet = this.executorUiElementSet;
		} else {
			uiElementSet = this.historicUiElementSet;
		}
		return uiElementSet;
	}
});