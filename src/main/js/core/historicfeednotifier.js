org_hudsonci.HistoricFeedNotifier = org_hudsonci.FeedNotifier.extend ({
	process: function(feed, result) {
		var builds = result.getBuilds();
		for (var i = 0; i < builds.length; i++) {
			if (builds[i].isFailure()) {
				var lastFail = feed.getLastFail();
				if (lastFail === null || lastFail === '' || lastFail < builds[i].getDate()) {
					feed.setLastFail(builds[i].getDate());
					this.preferences.addFeed(feed);
					this.notification.displayAlert(org_hudsonci_buildMonitorConst.TYPE_HISTORIC(), feed, builds[i], result.getTitle());
					this.notification.playSound(builds[i]);
				}
				break;
			}
		}
	}
});