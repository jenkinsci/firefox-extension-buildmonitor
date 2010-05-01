org_hudsonci.Scheduler = name_edwards_dean_Base.extend({
    constructor: function(service) {
        this.service = service;
    },
    schedule: function(callback, interval) {
        this.service.schedule(callback, interval);
    }
});