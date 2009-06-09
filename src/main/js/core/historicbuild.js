var HistoricBuild = DUI.Class.create(Build.prototype, {
	init: function(name, url, date) {
		this.name = name;
		this.url = url;
		this.date = date;
	},
	getDate: function() {
		return this.date;
	},
	getStatus: function() {
		return new String(this.name.match('[(][A-Za-z]+[)]')).replace(/[(]/, '').replace(/[)]/, '').toLowerCase();
	}
});
HistoricBuild.namespace('Hudson');