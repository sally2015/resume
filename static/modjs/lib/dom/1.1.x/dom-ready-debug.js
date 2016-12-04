/*!
 * JRaiser 2 Mobile Javascript Library
 * dom-ready - v1.1.0 (2015-03-31T17:05:32+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define(function(require, exports, module) { 'use strict';

/**
 * 本模块提供DOM Ready事件监听接口
 * @module dom/1.1.x/dom-ready
 * @catgory Infrastructure
 * @ignore
 */

/**
 * 添加DOM Ready事件回调
 * @method domReady
 * @exports
 * @param {Function} ready 回调函数
 */

var fns = [ ],
	listener,
	doc = document,
	hack = doc.documentElement.doScroll,
	domContentLoaded = 'DOMContentLoaded',
	loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

if (!loaded) {
	doc.addEventListener(domContentLoaded, listener = function () {
		doc.removeEventListener(domContentLoaded, listener);
		loaded = 1;
		while (listener = fns.shift()) {
			listener();
		}
	});
}

return function (fn) { loaded ? fn() : fns.push(fn) };

});