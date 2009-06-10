var HudsonFeed = Class.extend({
	init: function(url) {
		this.url = url;
	},
	getUrl: function() {
		return this.url;
	},
	isJob: function() {
		var isJob = false;
		if (this.url.match('/job/[^/]+') != null) {
			isJob = true;
		}
		return isJob;
	},
	isView: function() {
		var isView = false;
		if (this.url.match('/view/[^/]+') != null) {
			isView = true;
		}
		return isView;
	},
	getHostName: function() {
		return new String(this.url.match('http://[^/]+')).replace(/http:\/\//, '');
	},
	getItemName: function() {
		var itemName = null;
		if (this.isJob()) {
			itemName = new String(this.url.match('/job/[^/]+')).replace(/\/job\//, '');
		} else if (this.isView()) {
			itemName = new String(this.url.match('/view/[^/]+')).replace(/\/view\//, '');
		}
		return itemName;
	},
	getExecutorUrl: function() {
		return this.url.replace(/\/rss.*/, '').replace(/\/(job|view).*/, '') + '/computer/api/xml?depth=1';
	}
});