var path = require('path');
var fs = require('fs');
var PDF = require('pdfkit');

var DB = {
    filepath : 'public/test.pdf',
    init : function(express, app, serverPath) {
        var This = this;

        this.serverPath = serverPath;

        app.get('/save', function(req, res) {
            This.save(req, res);
        });

        app.get('/download', function(req, res) {
            This.download(req, res);
        });

        app.use(express.static('public'));
    },
    save : function(req, res) {
        console.log('---------------');

        var filepath = path.join(this.serverPath, this.filepath);

        //console.log(req.query.data);
        // console.log(__dirname)
        // console.log(filepath)

        var doc = new PDF();
        if (fs.existsSync(filepath)) {
            // console.log('existsSync...')
            fs.unlinkSync(filepath);
        }
        //doc.pipe(fs.createWriteStream('./test_'+new Date().getTime()+'.pdf'));
        // doc.pipe(fs.createWriteStream('./test.pdf',{
        //   defaultEncoding: 'utf8'
        // }));
        doc.pipe(fs.createWriteStream(filepath));

        text = req.query.data;

        //console.log(text)

        //text='中文';
        doc.font(path.join(this.serverPath, 'db/simsun.ttf'));
        doc.fontSize(20);
        doc.fillColor('blue');
        // doc.text(text,{
        // 	width:200
        // });
        doc.text(text);
        doc.end();

        // res.send({
        // 	status:200,
        // 	message:{
        // 		url:'./test.pdf'
        // 	}
        // });
        res.send('success');
        res.end();
    },
    download : function(req, res) {
        var fileName = 'test.pdf';
        var filepath = path.join(this.serverPath, this.filepath);

        console.log(filepath)

        res.download(filepath, fileName, function(err) {
            if (err) {
                console.log('err', err)
            } else {
                console.log('download success...')
            }
        });
    }
};

module.exports = DB; 