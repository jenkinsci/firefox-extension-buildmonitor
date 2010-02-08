org_hudsonci.Scheduler = Base.extend({
    constructor: function(service) {
        this.service = service;
    },
    schedule: function(callback, interval) {
        this.service.schedule(callback, interval);
    }
});