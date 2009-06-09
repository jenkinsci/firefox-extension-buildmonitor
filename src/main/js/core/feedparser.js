var FeedParser = DUI.Class.create({
	init: function(xml, size) {
		this.dom = new XMLDoc(xml);
		this.size = size;
	}
});
FeedParser.namespace('Hudson');