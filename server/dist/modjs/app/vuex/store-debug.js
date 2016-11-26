'use strict';

define(function (require, exports, module) {
	'use strict';

	var Vue = require('vue/2.1.x/vue'),
	    Vuex = require('vue/2.1.x/vuex'),
	    getters = require('/vuex/getters'),
	    actions = require('/vuex/actions');

	Vue.use(Vuex);

	var state = {
		currentBasicBg: "blue"
	};
	var mutations = {
		CHANGE_BASIC_BG: function CHANGE_BASIC_BG(state, color) {
			state.currentBasicBg = color;
		}
	};

	module.exports = new Vuex.Store({
		state: state,
		mutations: mutations,
		getters: getters,
		actions: actions
	});
});