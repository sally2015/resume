var DB = require('./db');
var HttpRequest = require('./http-request');
var Session = require('./session');

//暴露的接口对象
var Interface = {
    init: function(express, app, serverPath) {
        console.log('interface init...');
        var This = this;

        this.serverPath = serverPath;
        this.app = app;
        this.express = express;

        this.app.use(this.express.static('public'));
        this.app.use(this.express.static('files'));

        DB.connectDb(function(err, db) {
            console.log('connected...');
            This.initHttpRequest();
        });

        Session.init(this.app);
    },
    initHttpRequest: function() {
        HttpRequest.init(this.app, this.serverPath);
        HttpRequest.saveResume();
        HttpRequest.getResume();
        HttpRequest.download();
        HttpRequest.uploadImage();
        HttpRequest.register();
        HttpRequest.login();
        HttpRequest.logout();
    }
};


module.exports = Interface;
