org_hudsonci.SchedulerService = Base.extend ({
    constructor: function(ffTimerService) {
        this.ffTimerService = ffTimerService;
    },
    schedule: function(callback, interval) {
        this.ffTimerService.initWithCallback(callback, interval * 60 * 1000, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
    }
});