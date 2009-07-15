var HudsonAddFeedWindow = Base.extend({
	constructor: function(util, preferences) {
		this.util = util;
		this.preferences = preferences;
		this.feeds = null;
	},
	setMenuVisibility: function() {
		var contextMenu = document.getElementById('contentAreaContextMenu');
		if (contextMenu) {
			contextMenu.addEventListener('popupshowing', this._setMenuVisibility, false);
		}
	},
	// NOTE: 'this' in the context is the document, not HudsonAddFeedWindow instance
	_setMenuVisibility: function() {
		if (gContextMenu) {
			document.getElementById('hudson-context-menu-addlink').hidden = !(gContextMenu.onLink && !gContextMenu.onMailtoLink && util.isHudsonRss(gContextMenu.linkURL));
		}
	},
	prepare: function() {
		this.feeds = this.preferences.getFeeds();
		var emptyFeedIndex = this._getEmptyFeedIndex();
		document.getElementById('hudson-link-id').hidden = true;
		document.getElementById('hudson-link-id').value = emptyFeedIndex;
		if (emptyFeedIndex != -1) {
			document.getElementById('hudson-link-full').hidden = true;
			document.getElementById('hudson-link-add').hidden = false;
			
			var url = window.arguments[1];
			document.getElementById('hudson-link-name').value = this._getRecommendedName(url);
			document.getElementById('hudson-link-url').value = url;
		} else {
			document.getElementById('hudson-link-full').hidden = false;
			document.getElementById('hudson-link-add').hidden = true;
		}
	},
	save: function() {
		var id = this.util.getInteger(document.getElementById('hudson-link-id').value);
		var name = document.getElementById('hudson-link-name').value;
		var url = document.getElementById('hudson-link-url').value;
		var feed = new HudsonFeed(id, name, url, null);
		this.preferences.addFeed(feed);
	},
	_getRecommendedName: function(url) {
		var name = '';
		var feed = new HudsonFeed(-1, '', url, null);
		if (feed.isJob() || feed.isView()) {
			name = feed.getItemName();
		} else {
			name = feed.getHostName();
		}
		return name;
	},
	_getEmptyFeedIndex: function() {
		var emptyFeedIndex = -1;
		for (var i = 0; i < this.feeds.length; i++) {
			if (this.feeds[i].isEmpty()) {
				emptyFeedIndex = i;
				break;
			}
		}
		return emptyFeedIndex;
	}
});