define(function (require, exports, module) { 'use strict';
	var Vue = require('vue/2.1.x/vue'),
		Vuex = require('vue/2.1.x/vuex'),
		getters = require('/vuex/getters'),
		actions = require('/vuex/actions');
		
	Vue.use(Vuex);

	var state = {
		currentBasicBg: "blue",
		tipMsg: "初始化提示"
	}
	var mutations = {
		CHANGE_BASIC_BG: function (state, color) {
			state.currentBasicBg = color;
		},
		CHANGE_TIP_MEG: function (state, msg) {
			state.tipMsg = msg;
		}
	}

	module.exports = new Vuex.Store({
		state: state,
		mutations: mutations,
		getters: getters,
		actions: actions
	})

});