var HudsonHistoricFeedParser = HudsonFeedParser.extend ({
	init: function(xml, size, statusType) {
		this._super(xml, size);
		this.statusType = statusType;
	},
	parse: function() {
		var builds = new Array();
		var title = this.getElementValue(this.root, 'title');
		var entries = this.root.getElementsByTagName('entry');
		var successCount = 0;
		var size = Math.min(this.size, entries.length);
		for (var i = 0; i < size; i++) {
			var name = this.getElementValue(entries[i], 'title');
			var url = this.getAttributeValue(entries[i], 'link', 'href');
			var date = Date.parseExact(this.getElementValue(entries[i], 'published'), 'yyyy-MM-ddTHH:mm:ssZ');
			builds[i] = new HudsonHistoricBuild(name, url, date);
			if (builds[i].isSuccess()) {
				successCount++;
			}
		}
		var status;
		if (this.statusType == 'latest') {
			status = builds[0].getStatus();
		} else {
			status = this._getHealthStatus(size, successCount);
		}
		return new HudsonFeedResult(title, builds, status);
	},
	_getHealthStatus: function(size, successCount) {
		var status;
		var healthRate = successCount * 100 / size;
		if (healthRate >= 80) {
			status = "health_80";
		} else if (healthRate >= 60) {
			status = "health_60";
		} else if (healthRate >= 40) {
			status = "health_40";
		} else if (healthRate >= 20) {
			status = "health_20";
		} else {
			status = "health_00";
		}
		return status;
	}
});