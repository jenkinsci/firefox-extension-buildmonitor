/*****************************************************************
 * HudsonTreeMgr takes care of the management of tree view on
 * preferences window.
 */
function HudsonTreeMgr(prefMgr) {
    NUM_OF_FEEDS = 15;
    this.prefMgr = prefMgr;
    this.treeFeeds = null;
    this.treeView = null;
}
HudsonTreeMgr.prototype.initView = function() {
	treeFeeds = this.prefMgr.getFeeds();
	this.treeView = {
	    rowCount : NUM_OF_FEEDS,
	    getCellText : function(row, column) {
	    	if (row < treeFeeds.length) {
		    	var text = null;
		    	if (column.id == "hudson-prefs-feeds-name") {
		    		text = treeFeeds[row].getName();
		    	} else if (column.id == "hudson-prefs-feeds-url") {
		    		text = treeFeeds[row].getUrl();
		    	}
		    	return text;
		    }
	    },
	    isEditable: function isEditable(row, column) {
    		var isEditable = true;
    		if (column.id == "hudson-prefs-feeds-remove" || column.id == "hudson-prefs-feeds-up" || column.id == "hudson-prefs-feeds-down") {
	    		isEditable = false;
	    	}
	    	return isEditable;
	    },
	    setCellText : function(row, column, value) {
	    	if (column.id == "hudson-prefs-feeds-name") {
	    		treeFeeds[row].setName(value);
	    	} else if (column.id == "hudson-prefs-feeds-url") {
	    		treeFeeds[row].setUrl(value);
	    	}
	    },
	    setTree: function(treebox) { this.treebox = treebox; },
	    isContainer: function(row) { return false; },
	    isSeparator: function(row) { return false; },
	    isSorted: function() { return false; },
	    getLevel: function(row) { return 0; },
	    getImageSrc: function(row, column) {
	    	var imageSrc = null;
	    	var url = treeFeeds[row].getUrl();
	    	if (column.id == "hudson-prefs-feeds-remove" && url != null && url.length > 0) {
	    		imageSrc = "chrome://buildmonitor/skin/remove.png";
	    	} else if (column.id == "hudson-prefs-feeds-up" && url != null && url.length > 0 && row > 0) {
	    		imageSrc = "chrome://buildmonitor/skin/up.png";
	    	} else if (column.id == "hudson-prefs-feeds-down" && url != null && url.length > 0 && row < NUM_OF_FEEDS - 1) {
	    		imageSrc = "chrome://buildmonitor/skin/down.png";
	    	}
	    	return imageSrc;
	    },
	    getRowProperties: function(row, props) {},
	    getCellProperties: function(row, col, props) {},
	    getColumnProperties: function(colid, col, props) {}
	};
    document.getElementById("hudson-prefs-feeds").view = this.treeView;
}
HudsonTreeMgr.prototype.saveView = function() {
    for (var i = 0; i < treeFeeds.length; i++) {
    	prefMgr.setFeed(treeFeeds[i], "");
    }
}
HudsonTreeMgr.prototype.updateView = function(event) {
	var tree = document.getElementById("hudson-prefs-feeds");
	var tbo = tree.treeBoxObject;

	var row = { }, col = { }, child = { };
	tbo.getCellAt(event.clientX, event.clientY, row, col, child);

	var cellText = tree.view.getCellText(row.value, col.value);
	//alert("row value: " + row.value + ", column value:" + col.value + ", column id: " + col.value.id + ", text: " + cellText);
	if (col.value.id == "hudson-prefs-feeds-remove" && !treeFeeds[row.value].isIgnored()) {
		this.removeFeed(row.value);
	} else if (col.value.id == "hudson-prefs-feeds-up" && !treeFeeds[row.value].isIgnored() && row.value > 0) {
		this.swapFeeds(row.value - 1, row.value);
	} else if (col.value.id == "hudson-prefs-feeds-down" && !treeFeeds[row.value].isIgnored() && row.value < NUM_OF_FEEDS - 1) {
		this.swapFeeds(row.value, row.value + 1);
	}
}
HudsonTreeMgr.prototype.removeFeed = function(index) {
    for (var i = index; i < treeFeeds.length - 1; i++) {
    	treeFeeds[i].setName(treeFeeds[i + 1].getName());
    	treeFeeds[i].setUrl(treeFeeds[i + 1].getUrl());
    }
    treeFeeds[treeFeeds.length - 1].clear();
}
HudsonTreeMgr.prototype.swapFeeds = function(index1, index2) {
	var tempName = treeFeeds[index1].getName();
	var tempUrl = treeFeeds[index1].getUrl();
	treeFeeds[index1].setName(treeFeeds[index2].getName());
	treeFeeds[index1].setUrl(treeFeeds[index2].getUrl());
	treeFeeds[index2].setName(tempName);
	treeFeeds[index2].setUrl(tempUrl);
}