var HudsonBuildsPopup = HudsonUiElement.extend({
	prepare: function(feeds) {
		var container = document.getElementById('hudson-menupopup-builds-feeds');
		this.clear(container);
		
		for (var i = 0; i < feeds.length; i++) {
			var buildsMenupopup = document.createElement('menupopup');
			buildsMenupopup.setAttribute('id', this._getBuildsMenupopupId(feeds[i]));
			container.appendChild(buildsMenupopup);
		}
	},
	set: function(container, feed, builds) {
		alert('xxxxxxbuilds len:' + builds.length + ', builds:' + builds);
		var menupopup = this._getBuildsMenupopupElement(feed);
		this.clear(menupopup);
		
		for (var i = 0; i < builds.length; i++) {
			var menuitem = document.createElement('menuitem');
		    menuitem.setAttribute('label', builds[i].getDetails());
		   	menuitem.setAttribute('value', builds[i].getUrl());
		   	menuitem.setAttribute('oncommand', 'hudson_goTo(this.value)');
		   	menuitem.setAttribute('class', 'menuitem-iconic');
		   	// TODO: visual status as UIElement function?
		   	//menuitem.setAttribute('image', 'chrome://buildmonitor/skin/status/build/' + this.getVisualStatus(builds[i].getStatus()) + '.png');
		   	menuitem.setAttribute('image', 'chrome://buildmonitor/skin/status/build/' + builds[i].getStatus() + '.png');
		   	menuitem.setAttribute('maxwidth', '1000');
		   	menupopup.appendChild(menuitem);
		}
		container.setAttribute('popup', this._getBuildsMenupopupId(feed));
		alert('done');
	},
	_getBuildsMenupopupElement: function(feed) {
		return document.getElementById(this._getBuildsMenupopupId(feed));
	},
	_getBuildsMenupopupId: function(feed) {
		return 'hudson-menupopup-builds-' + this.getComponentId(feed);
	}
});