org_hudsonci.BuildsPopup = org_hudsonci.UiElement.extend({
	prepare: function(container, feed) {
		var buildsMenupopup = document.createElement('menupopup');
		buildsMenupopup.setAttribute('id', this._getBuildsMenupopupId(feed));
		container.appendChild(buildsMenupopup);
	},
	set: function(container, feed, builds, successColor) {
		var menupopup = this._getBuildsMenupopupElement(feed);
		this.uiUtil.clear(menupopup);
		
		for (var i = 0; i < builds.length; i++) {
			var menuitem = document.createElement('menuitem');
		    menuitem.setAttribute('label', builds[i].getDetails());
		   	menuitem.setAttribute('value', builds[i].getUrl());
		   	menuitem.setAttribute('oncommand', 'org_hudsonci.goTo(this.value)');
		   	menuitem.setAttribute('class', 'menuitem-iconic');
		   	menuitem.setAttribute('image', 'chrome://buildmonitor/skin/status/' + this.uiUtil.getStatusSkinType(this.type) + '/' + this.uiUtil.getVisualStatus(builds[i].getStatus(), successColor) + '.png');
		   	menuitem.setAttribute('maxwidth', '1000');
		   	menupopup.appendChild(menuitem);
		}
		container.setAttribute('popup', this._getBuildsMenupopupId(feed));
	},
	_getBuildsMenupopupElement: function(feed) {
		return document.getElementById(this._getBuildsMenupopupId(feed));
	},
	_getBuildsMenupopupId: function(feed) {
		return 'hudson-menupopup-builds-' + this.getUiElementId(feed);
	}
});