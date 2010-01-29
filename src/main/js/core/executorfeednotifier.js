org_hudsonci.ExecutorFeedNotifier = org_hudsonci.FeedNotifier.extend ({
	process: function(feed, result) {
		var builds = result.getBuilds();
		for (var i = 0; i < builds.length; i++) {
			if (builds[i].getStatus() == 'stuck') {
				this.notification.displayAlert(TYPE_EXECUTOR, feed, builds[i], result.getTitle());
				this.notification.playSound(builds[i]);
				break;
			}
		}
	}
});