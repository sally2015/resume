var SESSION = require('express-session');

/**
 * session
 */
var Session = {
    sessionName: 'ESESSIONID',
    init: function(app) {
        this.app = app;

        this.set();
    },
    /**
     * 设置session
     */
    set: function(options) {
        console.log(options);
        var data = {
            secure:'12345',
            name: this.sessionName,
            cookie: {
                //默认一天
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            },
            resave: false,
            saveUninitialized: true
        };

        console.log('---------------');

        if (options) {
            if (options.secret) { //secret:默认不设置
                data.secret = options.secret;
            }
            if (options.sessionName) {
                data.name = options.sessionName;
            }
            if (options.cookie) {
                for (var p in options.cookie) {
                    data.cookie[p] = options.cookie[p];
                }
            }
        }

        this.app.use(SESSION(data));
    }
};


module.exports = Session;
