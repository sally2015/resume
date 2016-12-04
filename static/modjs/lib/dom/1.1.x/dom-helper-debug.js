/*!
 * JRaiser 2 Mobile Javascript Library
 * dom-helper - v1.1.1 (2015-08-28T16:05:32+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define(function(require, exports, module) { 'use strict';

/**
 * 本模块提供节点数据存取接口
 * @module dom/1.1.x/dom-helper
 * @catgory Infrastructure
 * @ignore
 */


var base = require('base/1.1.x/');


var matchesSelector;
[
	'webkitMatchesSelector',
	'mozMatchesSelector',
	'oMatchesSelector',
	'matchesSelector'
].some(function(name) {
	if (document.documentElement[name]) {
		matchesSelector = name;
		return true;
	}
});


return {
	/**
	 * 查找所有匹配指定选择器规则的节点
	 * @method querySelectorAll
	 * @param {String} selector 选择器
	 * @param {Element} [context] 上下文节点
	 * @param {Array} [results] 如果不为空，则把查找到的节点添加到此数组
	 * @return {Array<Element>} 查找到的节点
	 */
	querySelectorAll: function(selector, context, results) {
		if (!selector) { return [ ]; }

		context = context || document;

		var result;
		if (context.nodeType === 1 || context.nodeType === 9) {
			try {
				result = base.toArray( context.querySelectorAll(selector) );
			} catch (e) {

			}
		}

		if (results && result) { base.merge(results, result); }

		return result || [ ];
	},

	/**
	 * 判断指定节点能否匹配指定选择器
	 * @method canMatch
	 * @param {Element} element 节点
	 * @param {String} selector 选择器
	 * @return {Boolean} 指定节点能否匹配指定选择器
	 */
	canMatch: function(node, selector) {
		if (!selector || !node || node.nodeType !== 1) { return false; }

		return matchesSelector ?
			node[matchesSelector](selector) :
			this.querySelectorAll(selector).indexOf(node) !== -1;
	},

	/**
	 * 在节点集合中过滤出符合节指定选择器规则的点
	 * @method matches
	 * @param {String} selector 选择器
	 * @param {Array<Element>} nodes 节点集合
	 * @return {Array<Element>} 过滤后的节点集合
	 */
	matches: function(selector, nodes) {
		if (!selector) { return nodes; }

		var canMatch = this.canMatch;
		return nodes.filter(function(node) {
			return canMatch(node, selector);
		});
	},

	/**
	 * 对指定节点数组进行唯一性筛选，并按节点在文档中的顺序排序
	 * @method uniqueSort
	 * @param {Array<Element>} nodes 节点数组
	 * @return {Array<Element>} 节点数组
	 */
	uniqueSort: function(nodes) {
		if (nodes.length > 1) {
			var hasDuplicate;

			// 按节点先后顺序排序
			nodes = nodes.sort(function(a, b) {
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				// 转为二进制 & 补够6位
				var cmp = ( '00000' + a.compareDocumentPosition(b).toString(2) ).slice(-6);
				if (cmp[4] == 1 || cmp[2] == 1) {
					return 1;
				} else if (cmp[3] == 1 || cmp[1] == 1) {
					return -1;
				} else {
					return 0;
				}
			});

			// 有重复时才需要去重复
			if (hasDuplicate) {
				// 排好序的情况下，重复节点在位置上肯定是连续的
				for (var i = nodes.length - 1; i >= 1; i--) {
					if (nodes[i] === nodes[i - 1]) {
						nodes.splice(i, 1);
					}
				}
			}
		}

		return nodes;
	}
};

});