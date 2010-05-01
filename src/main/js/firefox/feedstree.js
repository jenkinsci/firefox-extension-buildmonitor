org_hudsonci.FeedsTree = name_edwards_dean_Base.extend({
    constructor: function(preferences, numOfFeeds) {
        this.preferences = preferences;
        this.numOfFeeds = numOfFeeds;
        this.treeFeeds = null;
        this.treeView = null;
    },
    initView: function() {
        treeFeeds = this.preferences.getFeeds();
        this.treeView = {
            rowCount : this.numOfFeeds,
            getCellText : function(row, column) {
                if (row < treeFeeds.length) {
                    var text = null;
                    if (column.id == 'buildmonitor-prefs-feeds-name') {
                        text = treeFeeds[row].getName();
                    } else if (column.id == 'buildmonitor-prefs-feeds-url') {
                        text = treeFeeds[row].getUrl();
                    }
                    return text;
                }
            },
            isEditable: function isEditable(row, column) {
                var isIsEditable = true;
                if (column.id == 'buildmonitor-prefs-feeds-remove' || column.id == 'buildmonitor-prefs-feeds-up' || column.id == 'buildmonitor-prefs-feeds-down') {
                    isIsEditable = false;
                }
                return isIsEditable;
            },
            setCellText : function(row, column, value) {
                if (column.id == 'buildmonitor-prefs-feeds-name') {
                    treeFeeds[row].setName(value);
                } else if (column.id == 'buildmonitor-prefs-feeds-url') {
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
                if (column.id == 'buildmonitor-prefs-feeds-remove' && !treeFeeds[row].isIgnored()) {
                    imageSrc = 'chrome://buildmonitor/skin/menu/remove.png';
                } else if (column.id == 'buildmonitor-prefs-feeds-up' && !treeFeeds[row].isIgnored() && row > 0) {
                    imageSrc = 'chrome://buildmonitor/skin/menu/up.png';
                } else if (column.id == 'buildmonitor-prefs-feeds-down' && !treeFeeds[row].isIgnored() && row < 15 - 1) {
                    imageSrc = 'chrome://buildmonitor/skin/menu/down.png';
                }
                return imageSrc;
            },
            getRowProperties: function(row, props) {},
            getCellProperties: function(row, col, props) {},
            getColumnProperties: function(colid, col, props) {},
            cycleHeader: function(col) {}
        };
        document.getElementById('buildmonitor-prefs-feeds').view = this.treeView;
    },
    saveView: function() {
        for (var i = 0; i < treeFeeds.length; i++) {
            this.preferences.setFeed(treeFeeds[i], '');
        }
    },
    updateView: function(event) {
        var tree = document.getElementById('buildmonitor-prefs-feeds');
        var tbo = tree.treeBoxObject;
    
        var row = { }, col = { }, child = { };
        tbo.getCellAt(event.clientX, event.clientY, row, col, child);
    
        if (row.value !== null && col.value !== null) {
            var cellText = tree.view.getCellText(row.value, col.value);
            if (col.value.id == 'buildmonitor-prefs-feeds-remove' && !treeFeeds[row.value].isIgnored()) {
                this._removeFeed(row.value);
            } else if (col.value.id == 'buildmonitor-prefs-feeds-up' && !treeFeeds[row.value].isIgnored() && row.value > 0) {
                this._swapFeeds(row.value - 1, row.value);
            } else if (col.value.id == 'buildmonitor-prefs-feeds-down' && !treeFeeds[row.value].isIgnored() && row.value < this.numOfFeeds - 1) {
                this._swapFeeds(row.value, row.value + 1);
            }
        }
    },
    _removeFeed: function(index) {
        for (var i = index; i < treeFeeds.length - 1; i++) {
            treeFeeds[i].setName(treeFeeds[i + 1].getName());
            treeFeeds[i].setUrl(treeFeeds[i + 1].getUrl());
        }
    },
    _swapFeeds: function(index1, index2) {
        var tempName = treeFeeds[index1].getName();
        var tempUrl = treeFeeds[index1].getUrl();
        treeFeeds[index1].setName(treeFeeds[index2].getName());
        treeFeeds[index1].setUrl(treeFeeds[index2].getUrl());
        treeFeeds[index2].setName(tempName);
        treeFeeds[index2].setUrl(tempUrl);
    }
});