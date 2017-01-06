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
        // console.log(options);
        var data = {
            secret: Date.now(),
            name: this.sessionName,
            cookie: {
                //默认一天
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            },
            resave: false,
            saveUninitialized: true
        };

        // console.log('---------------');

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
    },
    //判断请求过来的session和服务端这边的是否一致
    isEqual: function(req) {
        var cookieSession = req.cookies.ESESSIONID;
        var serverSid = req.session.id;

        // console.log('-------cookieSession--------serverSid-----------');
        // console.log(cookieSession);
        // console.log('');
        // console.log(serverSid)
        // console.log('');

        cookieSession = cookieSession.substring(2);
        var cookieSid = cookieSession.substring(0, cookieSession.indexOf('.'));

        return cookieSid === serverSid ? true : false;
    },
    destroy: function(req) {
        req.session.destroy(function(err) {
            console.log('-----destroy--------');
            if (err) {
                console.log(err);
            }
        });
    }
};


module.exports = Session;
