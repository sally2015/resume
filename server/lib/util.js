/*!
 * Back2front
 * Utility functions
 */

'use strict';


/**
 * 把源对象的属性扩展到目标对象
 * @method extend
 * @param {Any} target 目标对象
 * @param {Any*} [source] 源对象。若有同名属性，则后者覆盖前者
 * @return {Any} 目标对象
 */
exports.extend = function(target) {
	if (target == null) { throw new Error('target cannot be null'); }

	var i = 0, len = arguments.length, p, src;
	while (++i < len) {
		src = arguments[i];
		if (src != null) {
			for (p in src) {
				target[p] = src[p];
			}
		}
	}

	return target;
};


/**
 * 对指定对象的每个元素执行指定函数
 * @method each
 * @param {Object|Array|ArrayLike} obj 目标对象
 * @param {Function(value,key,obj)} callback 操作函数，上下文为当前元素。
 *   当返回值为false时，遍历中断
 * @return {Object|Array|ArrayLike} 遍历对象
 */
exports.each = function(obj, callback) {
	if (obj != null) {
		var i, len = obj.length;
		if (len === undefined || typeof obj === 'function') {
			for (i in obj) {
				if ( false === callback.call(obj[i], obj[i], i, obj) ) {
					break;
				}
			}
		} else {
			i = -1;
			while (++i < len) {
				if ( false === callback.call(obj[i], obj[i], i, obj) ) {
					break;
				}
			}
		}
	}

	return obj;
};


/**
 * 创建类
 * @method createClass
 * @param {Function} constructor 构造函数
 * @param {Object} [methods] 方法
 * @param {Function} [Parent] 父类
 * @param {Function(args)|Array} [parentArgs] 传递给父类的参数，默认与子类构造函数参数一致
 * @return {Function} 类
 */
exports.createClass = function(constructor, methods, Parent, parentArgs) {
	var $Class = Parent ? function() {
		Parent.apply(
			this,
			parentArgs ? 
				(typeof parentArgs === 'function' ?
					parentArgs.apply(this, arguments) : parentArgs)
			: arguments
		);
		constructor.apply(this, arguments);
	} : function() { constructor.apply(this, arguments); };

	if (Parent) {
		$Class.prototype = Object.create(Parent.prototype);
		$Class.prototype.constructor = $Class;
	}
	if (methods) {
		for (var m in methods) { $Class.prototype[m] = methods[m]; }
	}
	return $Class;
};


/**
 * 创建拒绝状态的Promise
 * @method createError
 * @param {String} msg 错误信息
 * @param {Number} [status=200] HTTP错误状态
 * @return {Error|Promise} 错误对象
 */
exports.createError = function(msg, status) {
	var err = new Error(msg);
	err.status = status || 200;

	return Promise.reject(err); 
};


/**
 * 把字符串中的HTML特殊字符编码为HTML实体
 * @method htmlEscape
 * @param {String} content 要编码的内容
 * @return {String} 编码结果
 */
exports.htmlEscape = (function() {
	// HTML特殊字符及其对应的编码内容
	var re_entity = [ ], entityMap = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;'
	};
	for (var key in entityMap) { re_entity.push(key); }
	var re_entity = new RegExp('[' + re_entity.join('') + ']', 'g');

	return function(str) {
		return String(str).replace(re_entity, function(match) {
			return entityMap[match];
		});
	};
})();


/**
 * 比较版本号
 * @method compareVersion
 * @param {String} a 版本号a
 * @param {String} b 版本号b
 * @return {Number} 比较结果：1表示a>b，-1表示a<b，0表示相等
 */
exports.compareVersion = function(a, b) {
	if (a === b) { return 0; }

	a = String(a || 0).split('.');
	b = String(b || 0).split('.');

	var len = Math.min(a.length, b.length), tempA, tempB;
	for (var i = 0; i < len; i++) {
		tempA = parseInt(a[i]);
		tempB = parseInt(b[i]);

		if (tempA > tempB) {
			return 1;
		} else if (tempA < tempB) {
			return -1;
		}
	}

	if (a.length > b.length) {
		return 1;
	} else if (a.length < b.length) {
		return -1;
	}

	return 0;
};