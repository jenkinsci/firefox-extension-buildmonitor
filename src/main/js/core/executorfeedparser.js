var ExecutorFeedParser = DUI.Class.create(FeedParser.prototype, {
	parse: function() {
		var util = new Util();
		var builds = new Array();
		var root = this.dom.docNode;
		var computers = root.getElements('computer');
		var size = Math.min(this.size, computers.length);
		var buildCount = 0;
		for (var i = 0; i < size; i++) {
			var computerName = computers[i].getElements('displayName')[0].getText();
			var executors = computers[i].getElements('executor');
			for (var j = 0; j < executors.length; j++) {
				var isIdle = util.getBoolean(executors[j].getElements('idle')[0].getText());
				var isStuck = util.getBoolean(executors[j].getElements('likelyStuck')[0].getText());
				var executorName = computerName + '#' + j;
				var progress = util.getInteger(executors[j].getElements('progress')[0].getText());
				var url = null;
				var name = null;
				var currentExecutableElement = executors[j].getElements('currentExecutable')[0];
				if (currentExecutableElement != null) {
					url = currentExecutableElement.getElements('url')[0].getText();
					name = new String(url.match('/job/[^/]+/[^/]+')).replace(/\/job\//, '').replace(/\//, '#');
				}
				builds[buildCount++] = new ExecutorBuild(name, url, progress, isIdle, isStuck, executorName);
			}
		}
		return builds;
	}
});
ExecutorFeedParser.namespace('Hudson');