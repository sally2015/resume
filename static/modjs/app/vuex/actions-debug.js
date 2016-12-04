define(function (require, exports, module) { 'use strict';
	
	exports.changeBasicBg = function(context, color) {
		context.commit('CHANGE_BASIC_BG', color)
	}
});
