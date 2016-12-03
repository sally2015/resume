define(function (require, exports, module) { 'use strict';
	
	exports.changeBasicBg = function(context, color) {
		context.commit('CHANGE_BASIC_BG', color)
	}
	exports.changeResumeOptions = function(context, options) {
		context.commit('CHANGE_OPTIONS', options)
	}
});
