var HudsonFeedParser = Class.extend({
	init: function(size) {
		this.size = size;
	},
	getElementValue: function(element, elementName) {
		return element.getElementsByTagName(elementName)[0].childNodes[0].nodeValue;
	},
	getAttributeValue: function(element, elementName, attributeName) {
		return element.getElementsByTagName(elementName)[0].attributes.getNamedItem(attributeName).value;
	}
});