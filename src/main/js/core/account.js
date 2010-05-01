org_hudsonci.Account = name_edwards_dean_Base.extend({
    constructor: function(service) {
        this.service = service;
    },
    save: function(realm, username, password) {
        this.service.save(realm, username, password);
    },
    load: function(realm, username) {
        return this.service.load(realm, username);
    }
});