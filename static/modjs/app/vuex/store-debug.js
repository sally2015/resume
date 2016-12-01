define(function (require, exports, module) { 'use strict';
	var Vue = require('vue/2.1.x/vue'),
		Vuex = require('vue/2.1.x/vuex'),
		getters = require('/vuex/getters'),
		actions = require('/vuex/actions');
		
	Vue.use(Vuex);

	var state = {
		currentBasicBg: "blue",
		resumeOptions: {}

	}
	var mutations = {
		CHANGE_BASIC_BG: function (state, color) {
			state.currentBasicBg = color;
		},
		CHANGE_OPTIONS: function (state, options) {
			state.resumeOptions = options;
		}
	}

	module.exports = new Vuex.Store({
		state: state,
		mutations: mutations,
		getters: getters,
		actions: actions
	})

});