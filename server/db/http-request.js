var PATH = require('path');
var FS = require('fs');
var DB = require('./db');
var Pdf = require('./Pdf');
var Multiparty = require('multiparty');
var Session = require('./session');
var ResInfo = require('./resinfo');

/**
 * HTTP请求对象
 */
var HttpRequest = {
    init: function(app, serverPath) {
        this.app = app;
        this.serverPath = serverPath;
    },
    save: function() {
        var This = this;
        this.app.get('/save', function(req, res) {
            if(!Session.isEqual(req)){//先校验session
                res.send({
                    status: ResInfo._102.status,
                    message: ResInfo._102.msg
                });
            }

            // console.log('req.session------------');
            // console.log(req.session);
            // console.log(req.cookies);
            // console.log(SESSION);
            // console.log(SESSION.get(req.session.id));
            // console.log(req.sessionId)
            // console.log(Session.get(req.session.id));
            // debugger

            if (!req.cookies.username) {
                res.send({
                    status: ResInfo._102.status,
                    message: ResInfo._102.msg
                });
            }

            var data = req.query.data;

            //获取用户简历表id
            DB.getUserResumeId(req.cookies.username, function(result) {
                if (result.status === 200) {
                    data.id = result.id;

                    DB.save(data, function(result) {
                        res.send({
                            status: ResInfo._200.status,
                            message: ResInfo._200.msg
                        });
                    });
                } else {
                    res.send(result);
                }
            });
        });
    },
    download: function(req, res) {
        var This = this;
        this.app.get('/download', function(req, res) {
            var data = req.query.data;

            DB.get(data, function(result) {
                Pdf.generalFile(result, This.serverPath, function() {
                    var filepath = PATH.join(This.serverPath, Pdf.filepath);
                    var fileName = 'test.pdf';

                    res.download(filepath, fileName, function(err) {
                        if (err) {
                            console.log('err', err)
                        } else {
                            console.log('download success...')
                        }
                    });
                });
            });
        });
    },
    uploadImage: function(req, res) {
        var This = this;
        this.app.get('/uploadImage', function(req, res) {
            console.log('uploadImage...');

            var form = new Multiparty.Form();

            var uploadTemp = 'uploadTemp/';
            var storageDir = 'files/images/';

            FS.exists('uploadTemp', function(exists) {
                if (!exists) {
                    FS.mkdirSync('uploadTemp');
                }
            });
            //设置上传的默认路径
            form.uploadDir = PATH.join(This.serverPath, uploadTemp);

            form.parse(req, function(err, fields, files) {
                if (err) {
                    console.log('parse error: ' + err);
                } else {
                    var file = files.file[0];
                    var oldPath = file.path;
                    //需要对文件名编码一下
                    var newFileName = encodeURIComponent(file.originalFilename);
                    var newPath = PATH.join(This.serverPath, storageDir, newFileName);

                    //重命名为真实文件名(会移动文件)
                    FS.rename(oldPath, PATH.join(uploadTemp, newFileName), function(err) {
                        if (err) {
                            console.log('rename error: ' + err);
                        } else {
                            console.log('rename ok');
                        }

                        //新建文件到新的目录--https://segmentfault.com/a/1190000000519006
                        var readable = FS.createReadStream(PATH.join(This.serverPath, uploadTemp, newFileName));
                        var writable = FS.createWriteStream(newPath);
                        readable.pipe(writable);

                        readable.on('end', function() {
                            writable.end();

                            var callback = null;
                            if (fields.callback) {
                                callback = fields.callback;
                            }
                            var params = {
                                status: ResInfo._200.status,
                                message: ResInfo._200.msg,
                                url: 'http://localhost:2606/images/' + newFileName
                            };

                            res.set({
                                'content-type': 'text/html;charset=utf-8'
                            });
                            if (callback) {
                                res.send('<script>window.parent.' + callback + '(' + JSON.stringify(params) + ');</script>');
                            } else {
                                res.send('<script>window.parent.alert("没有callback...");</script>');
                            }
                        });
                    });
                }
            });
        });
    },
    register: function(req, res) {
        var This = this;
        this.app.get('/register', function(req, res) {
            var data = req.query;

            DB.isExist('t_user', {
                email: data.email
            }, function(result) {
                console.log('用户已存在？-->>' + result.exist)
                if (result.exist) {
                    res.send({
                        status: ResInfo._101.status,
                        message: ResInfo._101.msg
                    });
                } else {
                    DB.saveRegister(JSON.stringify(data), function(result) {
                        if (result.status === 200) {
                            res.send({
                                status: ResInfo._200.status,
                                message: ResInfo._200.msg
                            });
                        } else {
                            res.send({
                                status: ResInfo._103.status,
                                message: ResInfo._103.msg
                            });
                        }
                    });
                }
            });
        });
    },
    login: function(req, res) {
        var This = this;
        this.app.get('/login', function(req, res) {
            var data = req.query;

            DB.findUser(data.username, function(result) {
                if (result.status === 200) {
                    if (result.userInfo.pwd === data.pwd) { //校验密码是否相等
                        Session.set({
                            secret: result.userInfo.username
                        });
                        res.cookie('username', encodeURIComponent(data.username), {
                            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                            path: '/'
                        });
                        res.send({
                            status: ResInfo._200.status,
                            message: ResInfo._200.msg
                        });
                    } else {
                        res.send({
                            status: ResInfo._201.status,
                            message: ResInfo._201.msg
                        });
                    }
                } else {
                    res.send({
                        status: ResInfo._104.status,
                        message: ResInfo._104.msg
                    });
                }
            });
        });
    },
    logout: function(req, res) {
        var This = this;
        this.app.get('/logout', function(req, res) {
            var cookies = req.cookies;

            Session.set({
                secret: 'not_login'
            });

            if (cookies.username) {
                res.clearCookie('username', {
                    path: '/'
                });
                res.send({
                    status: ResInfo._200.status,
                    message: ResInfo._200.msg
                });
                return;
            }

            //如果没有cookie，则认为是退出成功
            res.send({
                status: ResInfo._200.status,
                message: ResInfo._200.msg
            });
        });
    }
};

module.exports = HttpRequest;
