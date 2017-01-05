/*!
 * Back2front
 * Route initialize
 */

'use strict';

// var api = require('./api');


module.exports = function(express, app) {
	var requireDir = require('require-dir'),
		util = require('../lib/util'),
		routeHelper = require('./route-helper'),
		routes = requireDir('./pages');



	// 调用渲染的callback
	function render(req, res, next) {
		if (res.routeHelper) {
			if ( res.routeHelper.rendered() ) {
				res.end();
			} else {
				res.routeHelper.render(res);
			}
		} else {
			next();
		}
	}
	//处理对应页面的路由
	util.each(routes, function(subRoutes, mainPath) {
		var router = express.Router();
		if (mainPath === '__') {
			mainPath = '/';
		} else {
			mainPath = '/' + mainPath;
		}


		util.each(subRoutes,function(subRoute, subPath ){
			if ( typeof subRoutes === 'function' || Array.isArray(subRoutes)) {
				subRoute = { callbacks: subRoute };
			} else {
				subRoute = util.extend({ }, subRoute);
			}
			if ( !Array.isArray(subRoute.callbacks) ) {
				subRoute.callbacks = [subRoute.callbacks];
			}

			subRoute.callbacks.push(render);

			subRoute.path = subPath;

			var template, resType;
			if (!subRoute.resType || subRoute.resType === 'html') {
				resType = 'html';
				// 默认模板路径为 pages/路由主路径/路径子路径
				template = ( 'pages/' + (
					subRoute.template ||
					( mainPath + '/' + subRoute.path.replace(/\//g, '__') )
				) ).replace(/\/{2,}/, '/');
			} else {
				resType = subRoute.resType;
			}
			// 映射的路由
			if (subRoute.path[0] !== '/') { subRoute.path = '/' +subRoute.path; }

			//要在render方法执行之前将模板定义好
			subRoute.callbacks.unshift(function(req, res, next){

				var RouteHelper;
				if (resType === 'json') {
					RouteHelper = routeHelper.JSONRouteHelper;
				} else {
					RouteHelper = routeHelper.HTMLRouteHelper;
				}

				res.routeHelper = new RouteHelper(template);

				next();
			});

			var verb = subRoute.verb || 'get',
				pathPattern = subRoute.pathPattern || subRoute.path;
				subRoute.callbacks.forEach(function(callback){
					router[verb](pathPattern, callback)
				});

		});

		app.use(mainPath, router);
	});


	// // catch 404 and forward to error handler
	// app.use(function(req, res, next) {
	// 	var err = new Error('404 您访问的页面不存在');
	// 	err.status = 404;

	// 	res.routeHelper = new routeHelper.HTMLRouteHelper();
	// 	next(err);
	// });

	// // 异常处理
	// var isDevEnv = app.get('env') !== 'production';
	// app.use(function(err, req, res, next) {
	// 	if (typeof err === 'string') { err = new Error(err); }

	// 	err.status = err.status || 500;

	// 	res.status(err.status);

	// 	try {
	// 		if(res.routeHelper){
	// 			res.routeHelper.viewData('headerTitle', '温馨提示');
	// 			res.routeHelper.renderInfo(res, {
	// 				status: 2,
	// 				httpStatus: err.status,
	// 				message: err.message || '',
	// 				stack: isDevEnv ? err.stack : ''
	// 			});
	// 		}
	// 	} catch (e) {
	// 		res.end();
	// 		throw e;
	// 	}
	// });
};
