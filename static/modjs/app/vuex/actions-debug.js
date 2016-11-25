define(function (require, exports, module) { 'use strict';
	
	exports.changeBasicBg = function(state, msg) {
		state.dispatch('CHANGE_BASIC_BG', msg)
	}
});
