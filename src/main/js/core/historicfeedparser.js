var HudsonHistoricFeedParser = HudsonFeedParser.extend ({
	parse: function() {
		var builds = new Array();
		var root = this.dom.docNode;
		var entries = root.getElements('entry');
		var size = Math.min(this.size, entries.length);
		for (var i = 0; i < size; i++) {
			var name = entries[i].getElements('title')[0].getText();
			var url = entries[i].getElements('link')[0].getAttribute('href');
			var x = entries[i].getElements('published')[0].getText();
			var date = Date.parseExact(x, 'yyyy-MM-ddTHH:mm:ssZ');
			builds[i] = new HudsonHistoricBuild(name, url, date); 
		}
		return builds;
	}
});