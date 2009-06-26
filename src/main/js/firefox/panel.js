var HudsonPanel = HudsonUiElement.extend({
	prepare: function(container, feeds) {
		for (var i = 0; i < feeds.length; i++) {
			var panel = document.createElement('statusbarpanel');
			panel.setAttribute('id', this._getPanelId(feeds[i]));
			panel.setAttribute('class', 'statusbarpanel-iconic-text');
			//TODO handle name hiding here
			//if (!this.prefMgr.getHideName()) {
				panel.setAttribute('label', feeds[i].getName());
			//}
			panel.setAttribute('popup', 'buildmonitor-builds');
			panel.setAttribute('context', 'buildmonitor-menu');
			panel.setAttribute('tooltip', 'buildmonitor-tooltip');
			container.appendChild(panel);
		}
	},
	set: function(status, feed) {
		// TODO: this.getVisualStatus(status)
		this.getPanelElement(feed).setAttribute('src', 'chrome://buildmonitor/skin/' + status + '.png');
	},
	getPanelElement: function(feed) {
		return document.getElementById(this._getPanelId(feed));
	},
	_getPanelId: function(feed) {
		return 'hudson-panel-' + this.getUiElementId(feed);
	}
});