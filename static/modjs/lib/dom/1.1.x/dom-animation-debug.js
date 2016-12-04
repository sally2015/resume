/*!
 * JRaiser 2 Mobile Javascript Library
 * dom-animation - v1.1.1 (2015-08-28T16:05:05+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define(function(require, exports, module) { 'use strict';

/**
 * 本模块提供节点动画接口
 * @module dom/1.1.x/dom-animation
 * @catgory Infrastructure
 * @ignore
 */

var base = require('base/1.1.x/'),
	domBase = require('./dom-base'),
	domData = require('./dom-data'),
	domStyle = require('./dom-style');


// 检测前缀
var testElt = document.documentElement,
	transitionProperty,
  	transitionDuration,
 	transitionTimingFunction,
 	transitionEnd;

if ('transitionProperty' in testElt.style) {
	transitionProperty = 'transitionProperty';
  	transitionDuration = 'transitionDuration';
 	transitionTimingFunction = 'transitionTimingFunction';
 	transitionEnd = 'transitionend';
} else {
	['Webkit', 'Moz'].some(function(vendor) {
		if ( (vendor + 'TransitionProperty') in testElt.style ) {
			transitionProperty = vendor + 'TransitionProperty';
			transitionDuration = vendor + 'TransitionDuration';
			transitionTimingFunction = vendor + 'TransitionTimingFunction';
			transitionEnd = vendor.toLowerCase() + 'TransitionEnd';
			return true;
		}
	});
}

testElt = null;


// 转换成CSS属性名
function dasherize(str) {
	return str.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase();
}

// 开始动画
function start(node, endStyle, options) {
	if ( !domBase.isHTMLElement(node) ) { return; }

	var styleNames = Object.keys(endStyle);
	if (!styleNames.length) { return; }

	styleNames = styleNames.map(function(key) { return dasherize(key) });

	options = base.customExtend({
		duration: 400,
		easing: 'linear'
	}, options);

	var finished, onTransitionEnd = function(e) {
		// 保证不是冒泡
		if (e && e.target !== e.currentTarget) { return; }

		// 防止重复执行
		if (finished) { return; }
		finished = true;

		node.removeEventListener(transitionEnd, onTransitionEnd, false);

		// 重置样式
		node.style[transitionProperty] =
		node.style[transitionDuration] =
		node.style[transitionTimingFunction] = '';

		// 兼容旧版本callback属性名
		var oncomplete = options.oncomplete || options.callback;
		if (oncomplete) { oncomplete.call(node); }
	};

	node.addEventListener(transitionEnd, onTransitionEnd, false);

	node.style[transitionProperty] = styleNames.join(', ');
	node.style[transitionDuration] = options.duration + 'ms';
	node.style[transitionTimingFunction] = options.easing;

	styleNames.forEach(function(key) {
		domStyle.setStyle(node, key, endStyle[key]);
	});

	// 防止样式参数与当前的一致，没有触发TransitionEnd
	setTimeout(onTransitionEnd, parseInt(options.duration) + 25);
}


exports.shortcuts = {
	/**
	 * 对当前所有节点执行动画
	 * @method animate
	 * @for NodeList
	 * @param {Object} endStyle 最终样式
	 * @param {Object} [options] 其他参数
	 *   @param {Number} [options.duration=400] 动画时长（毫秒）
	 *   @param {String} [options.easing='linear'] 缓动函数
	 *   @param {Function} [options.oncomplete] 动画执行完成后的回调函数
	 * @return {NodeList} 当前节点集合
	 */
	animate: function(endStyle, options) {
		this.forEach(function(node) {
			node.endStyle = endStyle;
			start(node, endStyle, options);
		});

		return this;
	}
};

});