define(function (require, exports, module) { 'use strict';
	
	exports.changeBasicBg = function(context, color) {
		context.commit('CHANGE_BASIC_BG', color)
	}
	exports.changeTipMsg = function(context, msg) {
		context.commit('CHANGE_TIP_MEG', msg)
	}
});
