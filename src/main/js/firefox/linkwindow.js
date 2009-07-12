var HudsonLinkWindow = Base.extend({
	constructor: function(preferences) {
		this.preferences = preferences;
		this.feeds = null;
	},
	setMenuVisibility: function() {
		var contextMenu = document.getElementById('contentAreaContextMenu');
		if (contextMenu) {
			contextMenu.addEventListener('popupshowing', this._setMenuVisibility, false);
		}
	},
	// NOTE: 'this' in the context is the document, not HudsonLinkWindow instance
	_setMenuVisibility: function() {
		if (gContextMenu) {
			document.getElementById('hudson-context-menu-addlink').hidden = !(gContextMenu.onLink && !gContextMenu.onMailtoLink && util.isHudsonRss(gContextMenu.linkURL));
		}
	},
	prepare: function() {
		this.feeds = this.preferences.getFeeds();
			document.getElementById('hudson-link-full').hidden = true;
			document.getElementById('hudson-link-add').hidden = false;
			
			var url = window.arguments[1];
			document.getElementById('hudson-link-name').value = this._getRecommendedName(url);
			document.getElementById('hudson-link-url').value = url;

			///document.getElementById('hudson-link-full').hidden = false;
			///document.getElementById('hudson-link-add').hidden = true;
			
		/*
		feeds = prefMgr.getFeeds();
		if (prefMgr.iCanHazFeedburger()) {
			document.getElementById('hudson-link-full').hidden = true;
			document.getElementById('hudson-link-add').hidden = false;
			
			var url = window.arguments[1];
			document.getElementById('hudson-link-name').value = this.getNameRecommendation(url);
			document.getElementById('hudson-link-url').value = url;
		} else {
			document.getElementById('hudson-link-full').hidden = false;
			document.getElementById('hudson-link-add').hidden = true;
		}
		*/
	},
	_getRecommendedName: function(url) {
		var name = '';
		var feed = new HudsonFeed(-1, '', url);
		if (feed.isJob() || feed.isView()) {
			name = feed.getItemName();
		} else {
			name = feed.getHostName();
		}
		return name;
	}
});