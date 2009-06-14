var HudsonTooltip = HudsonUiElement.extend({
	prepare: function(feeds) {
		var container = document.getElementById('hudson-tooltip-feeds');
		this.clear(container);
		
		for (var i = 0; i < feeds.length; i++) {
			var tooltip = document.createElement('tooltip');
			tooltip.setAttribute('id', this._getTooltipId(feeds[i]));
			tooltip.setAttribute('class', 'info');
			tooltip.setAttribute('noautohide', 'true');
			tooltip.setAttribute('maxwidth', '1000');
			container.appendChild(tooltip);
		}
	},
	set: function(container, items, title, feed) {
		var vbox = document.createElement("vbox");
		if (title) {
			var titleLabel = document.createElement("label");
			if (feed) {
				title += " [" + feed.getName() + "]";
			}
			titleLabel.setAttribute("value", title);
			titleLabel.setAttribute("class", "title");
			vbox.appendChild(titleLabel);
		}
		if (items != null && items.length > 0) {
			for (i = 0; i < items.length; i++) {
				var itemLabel = document.createElement("label");
				var text;
				if (typeof items[i] == "object") {
				    text = items[i].getDetails();
				    // TODO this.getVisualStatus(items[i].getStatus())
				    itemLabel.setAttribute("class", items[i].getStatus());
				} else {
				    text = items[i];
				}
			    itemLabel.setAttribute("value", text);
			   	vbox.appendChild(itemLabel);
			}
		} else {
			var itemLabel = document.createElement("label");
			itemLabel.setAttribute("value", "No item found");
			vbox.appendChild(itemLabel);
		}

		var tooltip = this._getTooltipElement(feed);
		this.clear(tooltip);
		tooltip.appendChild(vbox);
		container.setAttribute("tooltip", this._getTooltipId(feed));
	},
	_getTooltipElement: function(feed) {
		return document.getElementById(this._getTooltipId(feed));
	},
	_getTooltipId: function(feed) {
		return 'hudson-tooltip-' + this.getComponentId(feed);
	}
});