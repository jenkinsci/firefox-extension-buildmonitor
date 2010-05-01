org_hudsonci.AccountService = name_edwards_dean_Base.extend ({
    constructor: function(ffLoginManager, ffLoginInfo, hostName) {
        this.ffLoginManager = ffLoginManager;
        this.ffLoginInfo = ffLoginInfo;
        this.hostName = hostName;
    },
    save: function(realm, username, password) {
        if (username !== null && username !== '') {
            var newLogin = new this.ffLoginInfo(this.hostName, null, realm, username, password, '', '');
            var logins = this.ffLoginManager.findLogins({}, this.hostName, null, realm, {});
            if (logins.length === 0) {
                this.ffLoginManager.addLogin(newLogin);
            } else {
                this.ffLoginManager.modifyLogin(logins[0], newLogin);
            }
        }
    },
    load: function(realm, username) {
        var logins = this.ffLoginManager.findLogins({}, this.hostName, null, realm, null);
        var login = null;
        if (logins !== null && logins.length > 0) {
            login = logins[0];
        }
        return login;
    }
});