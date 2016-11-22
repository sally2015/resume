'use strict';

var util = require('../lib/util');

/**
 * 路由辅助器基类
 * @class BasicRouteHelper
 * @constructor
 * @param {String} template 页面模板
 */

var BasicRouteHelper = util.createClass(function(template) {
 	this._viewData = {};
 	this._template = template;
 	this._type = 'basic';
}, {
 	/**
	 * 获取路由辅助器类型
	 * @for BasicRouteHelper
	 * @return {String} 路由辅助器类型
	 */
	type: function () { return this._type;},

	/**
	 * 获取视图数据
	 * @method viewData
	 * @for BasicRouteHelper
	 * @param {String} key 键
	 * @return {Any} 值
	 */
	/**
	 * 设置视图数据
	 * @method viewData
	 * @for BasicRouteHelper
	 * @param {String} key 键
	 * @param {Any} value 值
	 */
	/**
	 * 设置视图数据
	 * @method viewData
	 * @for BasicRouteHelper
	 * @param {Object} map 键值对
	 */
	viewData: function(key, value) {
	 	var viewData = this._viewData;
	 	if (arguments.length === 1 && typeof key === 'string') {
	 		return viewData[key];
	 	} else {
	 		if (typeof key === 'object') {
	 			util.extend(viewData, key)
	 		} else {
	 			viewData[key] = value;
	 		}
	 	}
	},

	/**
	 * 映射数据到viewData
	 * @method mapToViewData
	 * @param {Array} dataSource 源数据
	 * @param {Object} config 映射配置
	 * @param {Function} [handler] 数据处理函数
	 */
	mapToViewData: function(dataSource, config) {
	 	var t = this;
	 	config.forEach(function(c, i){
	 		if (typeof c === 'string') {
	 			c = { key: c };
	 		}

	 		var data = dataSource[i];
	 		if (c.handler) {
	 			var temp = c.handler.call(t, data);
	 			if (temp !== undefined) {
	 				data = temp;
	 			}
	 		}

	 		if (c.key) { t.viewData(c.key, data);}
	 	})
	},

	/**
	 * 渲染视图
	 * @method render
	 * @for BasicRouteHelper
	 * @param {Object} res Response对象
	 */
	render: function(res) {
	 	this._rendered = true;
	 	res.end();
	},

	/**
	 * 渲染提示信息
	 * @method renderInfo
	 * @for BasicRouteHelper
	 * @param {Object} res Response对象
	 */
	renderInfo: function(res, info) {
	 	this._rendered = true;
	 	res.end();
	},

	/**
	 * 获取是否已渲染视图
	 * @method rendered
	 * @for BasicRouteHelper
	 * @return {Boolean} 是否已渲染视图
	 */
	rendered: function() { return !!this._rendered; }

});

/**
 * HTML路由辅助器
 * @class HTMLRouteHelper
 * @constructor
 * @extends {BasicRouteHelper}
 * @param {String} template 页面模板
 */

exports.HTMLRouteHelper = util.createClass(function(template) {
	this._type = 'html';
	this.setTemplate(template);
},{
	/**
	 * 设置页面模板
	 * @method setTemplate
	 * @for HTMLRouteHelper
	 * @param {String}} template 模板路径
	 */
	setTemplate: function(template) { this._template = template; },

	/**
	 * 渲染视图
	 * @method render
	 * @for HTMLRouteHelper
	 * @param {Object} res Response对象
	 */
	render: function(res, template) {
		res.render( this._template, this._viewData );
		this._rendered = true;
	},

	/**
	 * 渲染提示信息
	 * @method renderInfo
	 * @for HTMLRouteHelper
	 * @param {Object} res Response对象
	 */
	renderInfo: function(res, info) {
		info.backURL = info.backURL || res.req.get('Referer');
		info.status = info.status || 1;
		this.viewData('info', info);
		this._template = '_info';
		this.render(res);
	}

}, BasicRouteHelper);