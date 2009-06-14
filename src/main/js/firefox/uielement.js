var HudsonUiElement = Class.extend({
	init: function(localiser) {
		this.localiser = localiser;
	},
	getComponentId: function(component) {
		var id = 'main';
		// TODO: what to do with executor?
		if (component instanceof HudsonFeed) {
			id = 'feed-' + component.getId();
		} else if (component instanceof HudsonExecutorFeed) {
			id = 'executor-' + component.getId();
		}
		return id;
	},
	clear: function(elem) {
		while (elem.firstChild) {
			elem.removeChild(elem.firstChild);
		}
	}
});