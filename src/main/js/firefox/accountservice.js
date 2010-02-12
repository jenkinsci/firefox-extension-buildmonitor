org_hudsonci.AccountService = Base.extend ({
    constructor: function(ffLoginManager, hostName) {
        this.ffLoginManager = ffLoginManager;
        this.hostName = hostName;
    },
    save: function(realm, username, password) {
        var newLogin = new nsILoginInfo(this.hostName, null, realm, username, password, '', ''); 

        var logins = this.ffLoginManager.findLogins(1, this.hostName, null, realm, {});
        if (logins.length == 0) {
            this.ffLoginManager.addLogin(newLogin);
        } else {
            this.ffLoginManager.modifyLogin(logins[0], newLogin);
        }
    },
    load: function(realm, username) {
        var logins = this.ffLoginManager.findLogins(1, this.hostName, null, realm, null);
        
        var login = null;
        if (logins != null && logins.length > 0) {
            login = logins[0];
        }
        return login;
    }
});