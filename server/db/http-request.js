var PATH = require('path');
var FS = require('fs');
var DB = require('./db');
var Pdf = require('./pdf');
var Multiparty = require('multiparty');
var Session = require('./session');
var ResInfo = require('./resinfo');
var User = require('./user');
var Resume = require('./resume');
var Filter = require('./filter');

/**
 * HTTP请求对象
 */
var HttpRequest = {
    init: function(app, serverPath) {
        this.app = app;
        this.serverPath = serverPath;
    },
    filter: function() {
        this.app.get('/edit', function(req, res) {
            if (!Filter.checkLogin(req, res)) {
                res.redirect(302, '/');
                return;
            }
        });
    },
    saveResume: function() {
        var This = this;
        this.app.get('/save', function(req, res) {
            // console.log('saving...');

            if (!Filter.checkLogin(req, res)) {
                return;
            }

            var data = req.query.data;

            // console.log('-------save-------');

            User.getResumeId(decodeURIComponent(req.cookies.username), function(result) {
                if (result.status === 200) {
                    //此时，data是json格式的字符串
                    data = JSON.parse(data);
                    data.id = result.message.resumeId;
                    Resume.add(data, function(result) {
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
    getResume: function() {
        this.app.get('/getResume', function(req, res) {
            // console.log('-------getResume-------');

            if (!Filter.checkLogin(req, res)) {
                return;
            }

            User.getResumeId(decodeURIComponent(req.cookies.username), function(result) {
                if (result.status === 200) {
                    Resume.getAllDataById(result.message.resumeId, function(result) {
                        res.send({
                            status: ResInfo._200.status,
                            message: result.message
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
            if (!Filter.checkLogin(req, res)) {
                return;
            }

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
        this.app.post('/uploadImage', function(req, res) {
            // console.log('uploadImage...');

            if (!Filter.checkLogin(req, res)) {
                return;
            }

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
            User.add(req.query, function(result) {
                res.send(result);
            });
        });
    },
    login: function(req, res) {
        var This = this;
        this.app.get('/login', function(req, res) {
            var data = req.query;

            User.getByUsername(data.username, function(result) {
                if (result.status === 200) {
                    if (result.message.pwd === data.pwd) { //校验密码是否相等
                        Session.set({
                            secret: result.message.username
                                // secret:Date.now()
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
                        status: ResInfo._103.status,
                        message: ResInfo._103.msg
                    });
                }
            });
        });
    },
    logout: function(req, res) {
        var This = this;
        this.app.get('/logout', function(req, res) {
            if (!Filter.checkLogin(req, res)) {
                return;
            }

            Session.destroy(req);

            if (req.cookies.username) {
                res.clearCookie('username', {
                    path: '/'
                });
            }

            res.send({
                status: ResInfo._200.status,
                message: ResInfo._200.msg
            });
        });
    }
};

module.exports = HttpRequest;
