var PATH = require('path');
var FS = require('fs');
var PDF = require('pdfkit');
var DB = require('./db');
var multiparty = require('multiparty');
var http = require('http');

//服务器路径
var ServerPath = null;

//暴露的接口对象
var Interface = {
    init : function(express, app, serverPath) {
        ServerPath = serverPath;

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
                    Pdf.generalFile(result);

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

            app.use(express.static('public'));
            //所有文件的路径都是相对于存放目录的，因此，存放静态文件的目录名不会出现在 URL 中。
            app.use(express.static('files'));
        });

        app.post('/uploadImage',function(req,res){
		    console.log('uploadImage...');

		    var form = new multiparty.Form();

		    //设置上传的默认路径
		    form.uploadDir = PATH.join(ServerPath,'uploadTemp/'); 

		    form.parse(req, function(err, fields, files) {
		    	// var filesTmp = JSON.stringify(files,null,2);

			    if(err){
			      console.log('parse error: ' + err);
			    } else {
			      // console.log(fields);
			      // console.log(files);
			      var file = files.file[0];
			      var oldPath = file.path;
			      //需要对文件名编码一下
			      var newFileName=encodeURIComponent(file.originalFilename);
			      var newPath = PATH.join(ServerPath,'files/images/' + newFileName);
			      //重命名为真实文件名--移动文件到新的目录下
			      FS.rename(oldPath, newPath, function(err) {
			        if(err){
			          console.log('rename error: ' + err);
			        } else {
			          console.log('rename ok');
			        }
			      });
			    }

		      res.set({
		      	'content-type': 'text/plain;charset=utf-8'
		      });
		      res.send({
		      	status:200,
		      	message:'上传成功',
		      	url:'http://localhost:2606/images/' + newFileName
		      });

		    });

		    return;
		})
    }
};

//PDF文件对象
var Pdf = {
    filepath : 'public/test.pdf',
    generalFile : function(data) {
        var filepath = PATH.join(ServerPath, this.filepath);

        var doc = new PDF();
        if (FS.existsSync(filepath)) {
            // console.log('existsSync...')
            FS.unlinkSync(filepath);
        }

        doc.pipe(FS.createWriteStream(filepath));

        //var text=JSON.stringify(data);
        if (!data) {
            return;
        }

        doc.font(PATH.join(ServerPath, 'db/simsun.ttf'));

        var defaultFintSize=14;

        if (data.main) {
            //doc.fontSize(data.footer.bg);
        }
        if (data.header) {
        	var header_width=820,header_height=110;
            if(data.header.style.bgColor){
				doc.moveTo(0,0).lineTo(header_width,0).lineTo(header_width,header_height).lineTo(0,header_height);
		        doc.fill(data.header.style.bgColor);
            }

            doc.fontSize(data.header.style.fontSize);
            doc.fillColor(data.header.style.color);
            doc.text(data.header.name, data.header.style.left, data.header.style.top);

            doc.fontSize(data.header.city.style.fontSize ? data.header.city.style.fontSize : defaultFintSize);
            doc.fillColor(data.header.city.style.color ? data.header.city.style.color : 'black');
            doc.text(data.header.city.name, data.header.city.style.left, data.header.city.style.top);

            doc.fontSize(data.header.phone.style.fontSize ? data.header.phone.style.fontSize : defaultFintSize);
            doc.fillColor(data.header.phone.style.color ? data.header.phone.style.color : 'black');
            doc.text(data.header.phone.name, data.header.phone.style.left, data.header.phone.style.top);

            doc.fontSize(data.header.email.style.fontSize ? data.header.email.style.fontSize : defaultFintSize);
            doc.fillColor(data.header.email.style.color ? data.header.email.style.color : 'black');
            doc.text(data.header.email.name, data.header.email.style.left, data.header.email.style.top);

            doc.image(data.header.avatar.url, data.header.avatar.style.left, data.header.avatar.style.top,{
            	width:data.header.avatar.style.width,
            	height:data.header.avatar.style.height
            });
        }

        if (data.education) {
            doc.fontSize(data.education.style.fontSize);
            doc.fillColor(data.education.style.color);
            doc.text(data.education.name, data.education.style.left, data.education.style.top);

            doc.fontSize(data.education.time.style.fontSize ? data.education.time.style.fontSize : defaultFintSize);
            doc.fillColor(data.education.time.style.color ? data.education.time.style.color : 'black');
            doc.text(data.education.time.name, data.education.time.style.left, data.education.time.style.top);

            doc.fontSize(data.education.school.style.fontSize ? data.education.school.style.fontSize : defaultFintSize);
            doc.fillColor(data.education.school.style.color ? data.education.school.style.color : 'black');
            doc.text(data.education.school.name, data.education.school.style.left, data.education.school.style.top);

            doc.fontSize(data.education.major.style.fontSize ? data.education.major.style.fontSize : defaultFintSize);
            doc.fillColor(data.education.major.style.color ? data.education.major.style.color : 'black');
            doc.text(data.education.major.name, data.education.major.style.left, data.education.major.style.top);

            doc.fontSize(data.education.desc.style.fontSize ? data.education.desc.style.fontSize : defaultFintSize);
            doc.fillColor(data.education.desc.style.color ? data.education.desc.style.color : 'black');
            doc.text(data.education.desc.name, data.education.desc.style.left, data.education.desc.style.top);
        }

        if (data.project) {
            doc.fontSize(data.project.style.fontSize);
            doc.fillColor(data.project.style.color);
            doc.text(data.project.name, data.project.style.left, data.project.style.top);

            doc.fontSize(data.project.time.style.fontSize ? data.project.time.style.fontSize : defaultFintSize);
            doc.fillColor(data.project.time.style.color ? data.project.time.style.color : 'black');
            doc.text(data.project.time.name, data.project.time.style.left, data.project.time.style.top);

            doc.fontSize(data.project.detail.style.fontSize ? data.project.detail.style.fontSize : defaultFintSize);
            doc.fillColor(data.project.detail.style.color ? data.project.detail.style.color : 'black');
            doc.text(data.project.detail.name, data.project.detail.style.left, data.project.detail.style.top);

            doc.fontSize(data.project.supplement.style.fontSize ? data.project.supplement.style.fontSize : defaultFintSize);
            doc.fillColor(data.project.supplement.style.color ? data.project.supplement.style.color : 'black');
            doc.text(data.project.supplement.name, data.project.supplement.style.left, data.project.supplement.style.top);

            doc.fontSize(data.project.desc.style.fontSize ? data.project.desc.style.fontSize : defaultFintSize);
            doc.fillColor(data.project.desc.style.color ? data.project.desc.style.color : 'black');
            doc.text(data.project.desc.name, data.project.desc.style.left, data.project.desc.style.top);
        }

        if (data.work) {
            doc.fontSize(data.work.style.fontSize);
            doc.fillColor(data.work.style.color);
            doc.text(data.work.name, data.work.style.left, data.work.style.top);

            doc.fontSize(data.work.time.style.fontSize ? data.work.time.style.fontSize : defaultFintSize);
            doc.fillColor(data.work.time.style.color ? data.work.time.style.color : 'black');
            doc.text(data.work.time.name, data.work.time.style.left, data.work.time.style.top);

            doc.fontSize(data.work.detail.style.fontSize ? data.work.detail.style.fontSize : defaultFintSize);
            doc.fillColor(data.work.detail.style.color ? data.work.detail.style.color : 'black');
            doc.text(data.work.detail.name, data.work.detail.style.left, data.work.detail.style.top);

            doc.fontSize(data.work.supplement.style.fontSize ? data.work.supplement.style.fontSize : defaultFintSize);
            doc.fillColor(data.work.supplement.style.color ? data.work.supplement.style.color : 'black');
            doc.text(data.work.supplement.name, data.work.supplement.style.left, data.work.supplement.style.top);

            doc.fontSize(data.work.desc.style.fontSize ? data.work.desc.style.fontSize : defaultFintSize);
            doc.fillColor(data.work.desc.style.color ? data.work.desc.style.color : 'black');
            doc.text(data.work.desc.name, data.work.desc.style.left, data.work.desc.style.top);
        }

        if (data.profession) {
            doc.fontSize(data.profession.style.fontSize);
            doc.fillColor(data.profession.style.color);
            doc.text(data.profession.name, data.profession.style.left, data.profession.style.top);

            doc.fontSize(data.profession.desc.style.fontSize ? data.profession.desc.style.fontSize : defaultFintSize);
            doc.fillColor(data.profession.desc.style.color ? data.profession.desc.style.color : 'black');
            doc.text(data.profession.desc.name, data.profession.desc.style.left, data.profession.desc.style.top);
        }

        if (data.footer) {
        	//手动加一页。加了之后，坐标是相对当前页的。--http://pdfkit.org/docs/getting_started.html
        	doc.addPage();

            var footer_width=820,footer_height=data.footer.style.height;
            var footer_top=40;
            if(data.footer.bgColor){
				doc.moveTo(0,footer_top).lineTo(footer_width,footer_top).lineTo(footer_width,footer_height+footer_top).lineTo(0,footer_height+footer_top);
				doc.fill(data.footer.bgColor);
            }

            doc.fillColor('yellow');
        	doc.text('footer',10,50,{
        		align:'center'
        	});
        }

        doc.end();
    }
};

module.exports = Interface;
