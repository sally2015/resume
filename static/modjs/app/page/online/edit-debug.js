define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue');

	var topbarTpl = Vue.extend({
		template: '#tpl-topbar',
		data: function(){
			return {
				colorData: ['blue', 'green', 'brown'],
				isIndex: 'blue'
			}
		},
		methods: {
			changeColor: function(color) {
				this.isIndex = color;
			}
		}
	});
	new Vue({
		el: '#app',
		data:function(){
			return {
				
			}
		},
		components: {
	      'v-topbar': topbarTpl
	    }
	});
	
});
