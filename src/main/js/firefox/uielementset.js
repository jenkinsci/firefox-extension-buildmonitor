org_hudsonci.UiElementSet = name_edwards_dean_Base.extend({
	constructor: function(type, localiser) {
		this.panel = new org_hudsonci.Panel(type);
		this.tooltip = new org_hudsonci.Tooltip(type);
		this.buildsPopup = new org_hudsonci.BuildsPopup(type);
		this.menusPopup = new org_hudsonci.MenusPopup(type, localiser);
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