var HudsonFeedParser = Class.extend({
	init: function(xml, size) {
		this.dom = new XMLDoc(xml);
		this.xml = xml;
		this.size = size;
	}
});