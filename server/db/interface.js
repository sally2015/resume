var PATH = require('path');
var FS = require('fs');
var PDF = require('pdfkit');
var DB = require('./db');
var Multiparty = require('multiparty');
// var http = require('http');

//服务器路径
var ServerPath = null;

//暴露的接口对象
var Interface = {
    init : function(express, app, serverPath) {
        ServerPath = serverPath;

        app.use(express.static('public'));
        //所有文件的路径都是相对于存放目录的，因此，存放静态文件的目录名不会出现在 URL 中。
        app.use(express.static('files'));

        DB.connectDb(function(err, db) {
            console.log('connected...')
            app.get('/save', function(req, res) {
                var data = req.query.data;

                DB.save(data, function(result) {
                    res.send({
                        status : 200,
                        message : 'success'
                    });
                });
            });

            app.get('/download', function(req, res) {
                var data = req.query.data;

                DB.get(data, function(result) {
                    Pdf.generalFile(result, function() {
                        var filepath = PATH.join(ServerPath, Pdf.filepath);
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

            app.get('/register', function(req, res) {
                var data = req.query;

                DB.isExist('t_user',{email:data.email},function(result){
                    console.log('用户已存在？-->>'+result.exist)
                    if(result.exist){
                        res.send({
                            status : 100,
                            message : '用户已存在'
                        });
                    }else{
                        DB.saveRegister(JSON.stringify(data), function(result) {
                            if(result.status===200){
                                res.send({
                                    status : 200,
                                    message : '注册成功'
                                });
                            }else{
                                res.send({
                                    status : 500,
                                    message : '注册失败'
                                });
                            }
                        });
                    }
                });
            });

            app.get('/login', function(req, res) {
                var data = req.query;

                DB.findUser(data.username,function(result){
                    if(result.status===200){
                        if(result.pwd===data.pwd){//校验密码是否相等
                            res.cookie('username',encodeURIComponent(data.username),{
                                expires:new Date(Date.now()+24*60*60*1000),//有效期1天
                                path:'/'
                            });
                            res.send({
                                status : 200,
                                message : '登录成功'
                            });
                        }else{
                            res.send({
                                status : 103,
                                message : '密码错误'
                            });
                        }
                    }else{
                        res.send({
                            status : 102,
                            message : '用户不存在'
                        });
                    }
                });
            });

            app.get('/logout', function(req, res) {
                var cookies = req.cookies;

                if(cookies.username){
                    res.clearCookie('username',{
                        path:''
                    });
                    res.send({
                        status : 200,
                        message : '退出成功'
                    });
                    return;
                }

                //如果没有cookie，则认为是退出成功
                res.send({
                    status : 200,
                    message : '退出成功'
                });
            });
            
        });

        app.post('/uploadImage', function(req, res) {
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
            form.uploadDir = PATH.join(ServerPath, uploadTemp);

            form.parse(req, function(err, fields, files) {
                if (err) {
                    console.log('parse error: ' + err);
                } else {
                    var file = files.file[0];
                    var oldPath = file.path;
                    //需要对文件名编码一下
                    var newFileName = encodeURIComponent(file.originalFilename);
                    var newPath = PATH.join(ServerPath, storageDir, newFileName);

                    //重命名为真实文件名(会移动文件)
                    FS.rename(oldPath, PATH.join(uploadTemp, newFileName), function(err) {
                        if (err) {
                            console.log('rename error: ' + err);
                        } else {
                            console.log('rename ok');
                        }

                        //新建文件到新的目录--https://segmentfault.com/a/1190000000519006
                        var readable = FS.createReadStream(PATH.join(ServerPath, uploadTemp, newFileName));
                        var writable = FS.createWriteStream(newPath);
                        readable.pipe(writable);

                        readable.on('end', function() {
                            writable.end();

                            var callback = null;
                            if (fields.callback) {
                                callback = fields.callback;
                            }
                            var params = {
                                status : 200,
                                message : '上传成功',
                                url : 'http://localhost:2606/images/' + newFileName
                            };

                            res.set({
                                'content-type' : 'text/html;charset=utf-8'
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
        })
    }
};

//PDF文件对象
var Pdf = {
    filepath : 'files/pdf/test.pdf',
    generalFile : function(data, callback) {
        var filepath = PATH.join(ServerPath, this.filepath);

        var doc = new PDF();
        if (FS.existsSync(filepath)) {
            // console.log('existsSync...')
            FS.unlinkSync(filepath);
        }

        var stream = doc.pipe(FS.createWriteStream(filepath));
        //注意，输出流对象(可写流)是异步的，需要事件监听
        stream.on('finish', function() {
            callback();
        });

        if (!data) {
            return;
        }

        // console.log('============================');
        // console.log(data.header.style);
        // console.log(data.header.city.style);

        // doc.page.size=1200;
        // doc.page.size=[1400,2000];
        // console.log(doc.page.size)

        doc.font(PATH.join(ServerPath, 'db/simsun.ttf'));

        var defaultFontSize = 14;

        if (data.main) {
            //doc.fontSize(data.footer.bg);
        }
        if (data.header) {
            var header_width = 820, header_height = 110;
            if (data.header.style.bgColor) {
                doc.moveTo(0, 0).lineTo(header_width, 0).lineTo(header_width, header_height).lineTo(0, header_height);
                doc.fill(data.header.style.bgColor);
            }

            doc.fontSize(data.header.style.fontSize);
            doc.fillColor(data.header.style.color);
            doc.text(data.header.name, data.header.style.left, data.header.style.top, {
                width : data.header.style.width,
                height : data.header.style.height
            });

            doc.fontSize(data.header.city.style.fontSize ? data.header.city.style.fontSize : defaultFontSize);
            doc.fillColor(data.header.city.style.color ? data.header.city.style.color : 'black');
            doc.text(data.header.city.name, data.header.city.style.left, data.header.city.style.top, {
                width : data.header.city.style.width,
                height : data.header.city.style.height
            });

            doc.fontSize(data.header.phone.style.fontSize ? data.header.phone.style.fontSize : defaultFontSize);
            doc.fillColor(data.header.phone.style.color ? data.header.phone.style.color : 'black');
            doc.text(data.header.phone.name, data.header.phone.style.left, data.header.phone.style.top, {
                width : data.header.phone.style.width,
                height : data.header.phone.style.height
            });

            doc.fontSize(data.header.email.style.fontSize ? data.header.email.style.fontSize : defaultFontSize);
            doc.fillColor(data.header.email.style.color ? data.header.email.style.color : 'black');
            doc.text(data.header.email.name, data.header.email.style.left, data.header.email.style.top, {
                width : data.header.email.style.width,
                height : data.header.email.style.height
            });

            doc.image(data.header.avatar.url, data.header.avatar.style.left, data.header.avatar.style.top, {
                width : data.header.avatar.style.width,
                height : data.header.avatar.style.height
            });
        }

        if (data.education) {
            this.setDocData(doc, data.education, defaultFontSize);
        }
        if (data.project) {
            this.setDocData(doc, data.project, defaultFontSize);
        }
        if (data.work) {
            this.setDocData(doc, data.work, defaultFontSize);
        }

        if (data.profession) {
            doc.fontSize(data.profession.style.fontSize);
            doc.fillColor(data.profession.style.color);
            doc.text(data.profession.name, data.profession.style.left, data.profession.style.top, {
                width : data.profession.style.width,
                height : data.profession.style.height
            });

            doc.fontSize(data.profession.desc.style.fontSize ? data.profession.desc.style.fontSize : defaultFontSize);
            doc.fillColor(data.profession.desc.style.color ? data.profession.desc.style.color : 'black');
            doc.text(data.profession.desc.name, data.profession.desc.style.left, data.profession.desc.style.top, {
                width : data.profession.desc.style.width,
                height : data.profession.desc.style.height
            });
        }

        if (data.footer) {
            //手动加一页。加了之后，坐标是相对当前页的。--http://pdfkit.org/docs/getting_started.html
            doc.addPage();

            var footer_width = 820, footer_height = data.footer.style.height;
            var footer_top = 40;
            if (data.footer.bgColor) {
                doc.moveTo(0, footer_top).lineTo(footer_width, footer_top).lineTo(footer_width, footer_height + footer_top).lineTo(0, footer_height + footer_top);
                doc.fill(data.footer.bgColor);
            }

            doc.fillColor('yellow');
            doc.text('footer', 10, 50, {
                align : 'center'
            });
        }

        doc.end();
    },
    setDocData : function(doc, obj, defaultFontSize) {
        doc.fontSize(obj.style.fontSize);
        doc.fillColor(obj.style.color);
        doc.text(obj.name, obj.style.left, obj.style.top);

        if (obj.time) {
            doc.fontSize(obj.time.style.fontSize ? obj.time.style.fontSize : defaultFontSize);
            doc.fillColor(obj.time.style.color ? obj.time.style.color : 'black');
            doc.text(obj.time.name, obj.time.style.left, obj.time.style.top, {
                width : obj.time.style.width,
                height : obj.time.style.height
            });
        }

        if (obj.detail) {
            doc.fontSize(obj.detail.style.fontSize ? obj.detail.style.fontSize : defaultFontSize);
            doc.fillColor(obj.detail.style.color ? obj.detail.style.color : 'black');
            doc.text(obj.detail.name, obj.detail.style.left, obj.detail.style.top, {
                width : obj.detail.style.width,
                height : obj.detail.style.height
            });
        }

        if (obj.supplement) {
            doc.fontSize(obj.supplement.style.fontSize ? obj.supplement.style.fontSize : defaultFontSize);
            doc.fillColor(obj.supplement.style.color ? obj.supplement.style.color : 'black');
            doc.text(obj.supplement.name, obj.supplement.style.left, obj.supplement.style.top, {
                width : obj.supplement.style.width,
                height : obj.supplement.style.height
            });
        }

        doc.fontSize(obj.desc.style.fontSize ? obj.desc.style.fontSize : defaultFontSize);
        doc.fillColor(obj.desc.style.color ? obj.desc.style.color : 'black');
        doc.text(obj.desc.name, obj.desc.style.left, obj.desc.style.top, {
            width : obj.desc.style.width,
            height : obj.desc.style.height
        });
    }
};

module.exports = Interface;
