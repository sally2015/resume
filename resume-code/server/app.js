var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.set('env', process.env.NODE_ENV || "development");
console.log('server environment: ' + app.get('env') )

var xtpl = require('./lib/xtpl'),
	viewsDir = path.join(__dirname, 'views');

!function () {
	var XTemplate = require('xtemplate');

	var xtemplateCmds = require('./lib/xtemplate-command');
	for (var c in xtemplateCmds) {
		XTemplate.addCommand(c, xtemplateCmds[c]);
	}
	XTemplate.addCommand('scriptTpl', function(scope, option, buffer){
		var tpl = this;
		return buffer.async(function( newBuffer ){

			var tplPath = path.resolve(
				path.dirname(tpl.name),
				option.params[0]
			);

			xtpl.readFile(
				tplPath,
				buffer.tpl.root.config,
				function(err, content) {
					if (content != null) {
						content = '<script type="text/xtemplate" data-key="'+
						path.relative(viewsDir, tplPath).replace(/\\/g, '/')+'">'
						+ content +'</script>'
					}
					newBuffer.write(content).end()
				}
			)

		})
	})
	xtpl.config({ XTemplate: XTemplate })
}()
