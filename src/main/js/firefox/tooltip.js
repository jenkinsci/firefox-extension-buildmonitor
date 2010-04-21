org_hudsonci.Tooltip = org_hudsonci.UiElement.extend({
	prepare: function(container, feed) {
		var tooltip = document.createElement('tooltip');
		tooltip.setAttribute('id', this._getTooltipId(feed));
		tooltip.setAttribute('class', 'info');
		tooltip.setAttribute('noautohide', 'true');
		tooltip.setAttribute('maxwidth', '1000');
		container.appendChild(tooltip);
	},
	set: function(container, items, title, feed, successColor) {
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
		var itemLabel;
		if (items !== null && items.length > 0) {
			for (i = 0; i < items.length; i++) {
				itemLabel = document.createElement("label");
				var text;
				if (typeof items[i] == "object") {
				    text = items[i].getDetails();
				    itemLabel.setAttribute("class", this.uiUtil.getVisualStatus(items[i].getStatus(), successColor));
				} else {
				    text = items[i];
				}
			    itemLabel.setAttribute("value", text);
			   	vbox.appendChild(itemLabel);
			}
		} else {
			itemLabel = document.createElement("label");
			itemLabel.setAttribute("value", "No item found");
			vbox.appendChild(itemLabel);
		}

		var tooltip = this._getTooltipElement(feed);
		this.uiUtil.clear(tooltip);
		tooltip.appendChild(vbox);
		container.setAttribute("tooltip", this._getTooltipId(feed));
	},
	_getTooltipElement: function(feed) {
		return document.getElementById(this._getTooltipId(feed));
	},
	_getTooltipId: function(feed) {
		return 'hudson-tooltip-' + this.getUiElementId(feed);
	}
});