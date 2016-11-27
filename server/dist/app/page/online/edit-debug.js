'use strict';

define(function (require, exports, module) {
	'use strict';

	var Vue = require('vue/2.1.x/vue'),
	    Vuex = require('vue/2.1.x/vuex'),
	    util = require('util/1.0.x/util'),
	    store = require('/vuex/store');
	// #ajax
	var _data = {
		name: 'oby',
		location: 'guangzhou',
		phone: '18888888888',
		email: '1234455@qq.com'
	};
	var objState = Vuex.mapState({
		currentBasicBg: function currentBasicBg(state) {
			return state.currentBasicBg;
		}
	});
	var objGetters = Vuex.mapGetters({
		getCurrentBasicBg: function getCurrentBasicBg(state) {
			return state.getCurrentBasicBg;
		}
	});
	var objMutations = Vuex.mapMutations({
		CHANGE_BASIC_BG: function CHANGE_BASIC_BG(state) {
			return state.CHANGE_BASIC_BG;
		}
	});
	var objActions = Vuex.mapActions(['changeBasicBg']);

	var computedObj = util.extend(objState, objGetters);
	var methodsObj = util.extend(objMutations, objActions);
	var changeObj = {
		changeColor: function changeColor(color) {
			this.changeBasicBg(color);
			this.isIndex = color;
		}
	};
	var obj = util.extend(methodsObj, changeObj);
	var topbarTpl = Vue.extend({
		template: '#tpl-topbar',
		data: function data() {
			return {
				colorData: ['blue', 'green', 'brown'],
				isIndex: 'blue'
			};
		},
		methods: obj
	});
	var bodyTpl = Vue.extend({
		template: '#tpl-body',
		data: function data() {
			return {
				basicName: _data.name,
				contactList: {
					location: _data.location,
					phone: _data.phone,
					email: _data.email
				},
				currentBasicBg: ''

			};
		},
		computed: computedObj,
		methods: {}
	});

	var vm = new Vue({
		el: '#app',
		store: store,
		data: function data() {
			return {
				currentBasicBg: ''
			};
		},
		watch: {
			basicName: function basicName(newVal, oldVal) {}
		},
		computed: computedObj,
		methods: methodsObj,
		components: {
			'v-topbar': topbarTpl,
			'v-body': bodyTpl
		}
	});
});