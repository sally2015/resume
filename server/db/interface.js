var DB = require('./db');
var HttpRequest = require('./http-request');

//暴露的接口对象
var Interface = {
    init: function(express, app, serverPath) {
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
    },
    initHttpRequest: function() {
        HttpRequest.init(this.app, this.serverPath);
        HttpRequest.save();
        HttpRequest.download();
        HttpRequest.uploadImage();
        HttpRequest.register();
        HttpRequest.login();
        HttpRequest.logout();
    }
};


module.exports = Interface;
