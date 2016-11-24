/*!
 * Back2front
 * Pre-execute functions of different page types
 */

'use strict';

var util = require('../lib/util');


// 在数组最前面插入元素
function prepend(elt, arr) {
	if ( Array.isArray(arr) ) {
		arr = arr.slice();
	} else if (arr) {
		arr = [arr];
	} else {
		arr = [ ];
	}

	if (elt) { arr.unshift(elt); }

	return arr;
}
exports.prepend = prepend;


// 基础页面类型
function basicPage(callbacks) {
	return prepend(function(req, res, next) {
		res.routeHelper.viewData( 'currentYear', (new Date).getFullYear() );
		return req.api(
			'web/seo', { link: req.originalUrl }, false
		).then(function(apiRes) {
			res.routeHelper.viewData({
				pageTitle: apiRes.title,
				keywords: apiRes.keyWords,
				description: apiRes.descript
			});
		});
	}, callbacks);
}
exports.basic = basicPage;


// 标准页面类型
function normalPage(callbacks) {
	return basicPage(
		prepend(function(req, res, next) {
			// 暂时没有作用
			next();
		}, callbacks)
	);
}
exports.normal = normalPage;
