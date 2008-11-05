/*****************************************************************
 * TreeMgr takes care of the management of tree view on
 * preferences window.
 */
function TreeMgr(prefMgr) {
    NUM_OF_FEEDS = 15;
    this.prefMgr = prefMgr;
    this.treeFeeds = null;
    this.treeView = null;
}
TreeMgr.prototype.initView = function() {
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
    		return true;
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
	    	}
	    	return imageSrc;
	    },
	    getRowProperties: function(row, props) {},
	    getCellProperties: function(row, col, props) {},
	    getColumnProperties: function(colid, col, props) {}
	};
    document.getElementById("hudson-prefs-feeds").view = this.treeView;
}
TreeMgr.prototype.saveView = function() {
    for (var i = 0; i < treeFeeds.length; i++) {
    	prefMgr.setFeed(treeFeeds[i], "");
    }
}
TreeMgr.prototype.removeFeedFromView = function(index) {
    for (var i = index; i < treeFeeds.length - 1; i++) {
    	treeFeeds[i].setName(treeFeeds[i + 1].getName());
    	treeFeeds[i].setUrl(treeFeeds[i + 1].getUrl());
    }
    treeFeeds[treeFeeds.length - 1].clear();
}