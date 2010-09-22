org_hudsonci.HistoricBuild = org_hudsonci.Build.extend ({
	constructor: function(name, url, date) {
		this.base(name, url);
		this.date = date;
	},
	getDate: function() {
		return this.date;
	},
	getStatus: function() {
	    var status = String(this.name.match('[(].+[)]$')).replace(/[(]/, '').replace(/[)]/, '').toLowerCase();
	    if (status === 'stable' || status === 'back to normal') {
	        status = 'success';
	    } else if (status.match(/^broken.*/) || status.match(/failure$/)) {
	        status = 'failure';
        } else if (status.match(/.*failing.*/) || status.match(/fail$/)) {
            status = 'unstable';
        }
		return status;
	},
	getDetails: function() {
		return this.name + ' - ' + org_ejohn_prettyDateUTC(this.date);
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