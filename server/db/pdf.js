var PATH = require('path');
var FS = require('fs');
var PDF = require('pdfkit');

/**
 * PDF文件对象
 */
var Pdf = {
    fileDir: 'files/pdf/',
    filepath: 'files/pdf/test.pdf',
    generalFile: function(data, serverPath, callback) {
        var filepath = PATH.join(serverPath, this.filepath);

        var doc = new PDF();
        if (!FS.existsSync(this.fileDir)){
          FS.mkdirSync(this.fileDir);
        }
            if (FS.existsSync(filepath)) {
                console.log('existsSync...')
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

        doc.font(PATH.join(serverPath, 'db/simsun.ttf'));

        var defaultFontSize = 14;

        if (data.main) {
            //doc.fontSize(data.footer.bg);
        }
        if (data.header) {
            var header_width = 820,
                header_height = 110;
            if (data.header.style.bgColor) {
                doc.moveTo(0, 0).lineTo(header_width, 0).lineTo(header_width, header_height).lineTo(0, header_height);
                doc.fill(data.header.style.bgColor);
            }

            doc.fontSize(data.header.style.fontSize);
            doc.fillColor(data.header.style.color);
            doc.text(data.header.name, data.header.style.left, data.header.style.top, {
                width: data.header.style.width,
                height: data.header.style.height
            });

            doc.fontSize(data.header.city.style.fontSize ? data.header.city.style.fontSize : defaultFontSize);
            doc.fillColor(data.header.city.style.color ? data.header.city.style.color : 'black');
            doc.text(data.header.city.name, data.header.city.style.left, data.header.city.style.top, {
                width: data.header.city.style.width,
                height: data.header.city.style.height
            });

            doc.fontSize(data.header.phone.style.fontSize ? data.header.phone.style.fontSize : defaultFontSize);
            doc.fillColor(data.header.phone.style.color ? data.header.phone.style.color : 'black');
            doc.text(data.header.phone.name, data.header.phone.style.left, data.header.phone.style.top, {
                width: data.header.phone.style.width,
                height: data.header.phone.style.height
            });

            doc.fontSize(data.header.email.style.fontSize ? data.header.email.style.fontSize : defaultFontSize);
            doc.fillColor(data.header.email.style.color ? data.header.email.style.color : 'black');
            doc.text(data.header.email.name, data.header.email.style.left, data.header.email.style.top, {
                width: data.header.email.style.width,
                height: data.header.email.style.height
            });

            doc.image(data.header.avatar.url, data.header.avatar.style.left, data.header.avatar.style.top, {
                width: data.header.avatar.style.width,
                height: data.header.avatar.style.height
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
                width: data.profession.style.width,
                height: data.profession.style.height
            });

            doc.fontSize(data.profession.desc.style.fontSize ? data.profession.desc.style.fontSize : defaultFontSize);
            doc.fillColor(data.profession.desc.style.color ? data.profession.desc.style.color : 'black');
            doc.text(data.profession.desc.name, data.profession.desc.style.left, data.profession.desc.style.top, {
                width: data.profession.desc.style.width,
                height: data.profession.desc.style.height
            });
        }

        if (data.footer) {
            //手动加一页。加了之后，坐标是相对当前页的。--http://pdfkit.org/docs/getting_started.html
            doc.addPage();

            var footer_width = 820,
                footer_height = data.footer.style.height;
            var footer_top = 40;
            if (data.footer.bgColor) {
                doc.moveTo(0, footer_top).lineTo(footer_width, footer_top).lineTo(footer_width, footer_height + footer_top).lineTo(0, footer_height + footer_top);
                doc.fill(data.footer.bgColor);
            }

            doc.fillColor('yellow');
            doc.text('footer', 10, 50, {
                align: 'center'
            });
        }

        doc.end();
    },
    setDocData: function(doc, obj, defaultFontSize) {
        doc.fontSize(obj.style.fontSize);
        doc.fillColor(obj.style.color);
        doc.text(obj.name, obj.style.left, obj.style.top);

        if (obj.time) {
            doc.fontSize(obj.time.style.fontSize ? obj.time.style.fontSize : defaultFontSize);
            doc.fillColor(obj.time.style.color ? obj.time.style.color : 'black');
            doc.text(obj.time.name, obj.time.style.left, obj.time.style.top, {
                width: obj.time.style.width,
                height: obj.time.style.height
            });
        }

        if (obj.detail) {
            doc.fontSize(obj.detail.style.fontSize ? obj.detail.style.fontSize : defaultFontSize);
            doc.fillColor(obj.detail.style.color ? obj.detail.style.color : 'black');
            doc.text(obj.detail.name, obj.detail.style.left, obj.detail.style.top, {
                width: obj.detail.style.width,
                height: obj.detail.style.height
            });
        }

        if (obj.supplement) {
            doc.fontSize(obj.supplement.style.fontSize ? obj.supplement.style.fontSize : defaultFontSize);
            doc.fillColor(obj.supplement.style.color ? obj.supplement.style.color : 'black');
            doc.text(obj.supplement.name, obj.supplement.style.left, obj.supplement.style.top, {
                width: obj.supplement.style.width,
                height: obj.supplement.style.height
            });
        }

        doc.fontSize(obj.desc.style.fontSize ? obj.desc.style.fontSize : defaultFontSize);
        doc.fillColor(obj.desc.style.color ? obj.desc.style.color : 'black');
        doc.text(obj.desc.name, obj.desc.style.left, obj.desc.style.top, {
            width: obj.desc.style.width,
            height: obj.desc.style.height
        });
    }
};

module.exports = Pdf;
