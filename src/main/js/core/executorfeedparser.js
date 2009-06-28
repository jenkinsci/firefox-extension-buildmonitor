var HudsonExecutorFeedParser = HudsonFeedParser.extend ({
	parse: function(xml) {
		var util = new HudsonUtil();
		var root = new DOMParser().parseFromString(xml, "text/xml");
		var builds = new Array();
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
				if (currentExecutableElement != null) {
					url = this.getElementValue(currentExecutableElement, 'url');
					name = new String(url.match('/job/[^/]+/[^/]+')).replace(/\/job\//, '').replace(/\//, '#');
				}
				builds[buildCount++] = new HudsonExecutorBuild(name, url, progress, isIdle, isStuck, executorName);
        		if (isStuck == true) {
        			status = 'stuck';
        			// TODO notify
			        //this.notificationMgr.playSound("stuck");
					//this.notificationMgr.displayAlert(executorFeed, title, executors[j]);
        		} else if (status != 'stuck' && currentExecutableElement != null) {
        			status = 'running';
        		}
			}
		}
		return new HudsonFeedResult('Hudson build executors', builds, status);
	}
});