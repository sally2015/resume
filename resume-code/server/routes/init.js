'use strict';

module.exports = function(express, app){
	var requireDir = require('require-dir'),
		util = require('../lib/util.js'),
		routeHelper = require('./route-helper'),
		routes = requireDir('./pages');


		// 404 error
		app.use(function(req, res, next){
			var err = new Error("404 访问的页面不存在");
			err.status = 404;

			res.routeHelper = new routeHelper.HTMLRouteHelper();
			next(err);
		});

		//异常处理
		var isDevEnv = app.get('env') !== 'production';
		app.use(function(err, req, res, next){
			if (typeof err === 'string') { err = new Error(err); };
			
			err.status = err.status ||500;

			res.status(err.status);

			try {
				res.routeHelper.viewData('headerTitle','温馨提示')
				res.routeHelper.renderInfo(res ,{
					status: 2,
					httpStatus: err.status,
					message: err.message || '',
					stack: isDevEnv ? err.stack : ''
				})
			} catch (e) {
				res.end();
				throw e;
			}
		});

}
