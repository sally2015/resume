var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var Interface = require('./db/interface');

var app = express();

Interface.init(express,app,__dirname);

app.set('env', process.env.NODE_ENV || "development");
console.log('server environment: ' + app.get('env') )

	//xtpl 是xtemplate模板引擎针对express和koa的适配器。
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
}();

//view engine
app.set('views', viewsDir);
app.engine('html', xtpl.__express);
app.set('view engine', 'html');

//middleware
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 静态文件及其过期文件
app.use(
	express.static(
		path.resolve(__dirname, '../static'), {
			// maxAge: config.staticExpires * 60 *1000
		}
	)
)


// 初始化路由
require('./routes/init')(express, app);

module.exports = app;


