var HudsonHistoricBuild = HudsonBuild.extend ({
	constructor: function(name, url, date) {
		this.base(name, url);
		this.date = date;
	},
	getDate: function() {
		return this.date;
	},
	getStatus: function() {
		return new String(this.name.match('[(][_A-Za-z]+[)]')).replace(/[(]/, '').replace(/[)]/, '').toLowerCase();
	},
	getDetails: function() {
		return this.name + ' - ' + prettyDateUTC(this.date);
	},
	isSuccess: function() {
		var isSuccess = false;
		if (this.getStatus() == 'success') {
			isSuccess = true;
		}
		return isSuccess;
	},
	isFailure: function() {
		var isFailure = false;
		if (this.getStatus() == 'failure') {
			isFailure = true;
		}
		return isFailure;
	}
});