org_hudsonci.ExecutorFeedParser = org_hudsonci.FeedParser.extend ({
	parse: function(xml) {
		var util = new org_hudsonci.Util();
		var root = new DOMParser().parseFromString(xml, "text/xml");
		var builds = [];
		var computers = root.getElementsByTagName('computer');
		var size = Math.min(this.size, computers.length);
		var buildCount = 0;
		var status = 'idle';
		for (var i = 0; i < size; i++) {
			var computerName = this.getElementValue(computers[i], 'displayName');
			var executors = computers[i].getElementsByTagName('executor');
			for (var j = 0; j < executors.length; j++) {
				var isIdle = util.getBoolean(this.getElementValue(executors[j], 'idle'));
				var isStuck = util.getBoolean(this.getElementValue(executors[j], 'likelyStuck'));
				var executorName = computerName + '#' + j;
				var progress = util.getInteger(this.getElementValue(executors[j], 'progress'));
				var url = null;
				var name = null;
				var currentExecutableElement = executors[j].getElementsByTagName('currentExecutable')[0];
				if (currentExecutableElement !== null && currentExecutableElement !== undefined) {
					url = this.getElementValue(currentExecutableElement, 'url');
					name = String(url.match('/job/[^/]+/[^/]+')).replace(/\/job\//, '').replace(/\//, '#');
				}
				builds[buildCount++] = new org_hudsonci.ExecutorBuild(name, url, progress, isIdle, isStuck, executorName);
        		if (isStuck === true) {
        			status = 'stuck';
        		} else if (status != 'stuck' && currentExecutableElement !== null && currentExecutableElement !== undefined) {
        			status = 'running';
        		}
			}
		}
		return new org_hudsonci.FeedResult('Hudson build executors', builds, status);
	}
});