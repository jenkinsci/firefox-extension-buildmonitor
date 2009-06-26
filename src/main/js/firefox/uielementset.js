var HudsonUiElementSet = Class.extend({
	init: function(type) {
		this.panel = new HudsonPanel(type);
		this.tooltip = new HudsonTooltip(type);
		this.buildsPopup = new HudsonBuildsPopup(type);
		this.menusPopup = new HudsonMenusPopup(type, localiser);
	},
	getPanel: function() {
		return this.panel;
	},
	getTooltip: function() {
		return this.tooltip;
	},
	getBuildsPopup: function() {
		return this.buildsPopup;
	},
	getMenusPopup: function() {
		return this.menusPopup;
	}
});