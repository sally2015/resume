define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue');
	return Vue.extend({
		template: '#tpl-logReg',
		data: function() {
			return {
				isLogin: true
			}
		},
		methods: {
			changeModule: function(btn){
				this.isLogin = btn;
			}
		}
	});
});