define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue'),
		store = require('/vuex/store');
	// #ajax
	var data = {
		name: 'oby',
		location: 'guangzhou',
		phone: '18888888888',
		email: '1234455@qq.com'
	}


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
				console.log(this.changeBasicBg)
				this.isIndex = color;
			}
		}
	});
	var bodyTpl = Vue.extend({
		template: '#tpl-body',
		data: function(){
			return {
				basicName: data.name,
				contactList: {
					location: data.location,
					phone: data.phone,
					email: data.email
				}
				
			}
		},
		methods: {
		}
	});
	
	var vm = new Vue({
		el: '#app',
		store: store,
		data:function(){
			return {
				currentBasicBg: ''
			}
		},
		watch: {
			basicName: function (newVal, oldVal){	
				
			}
		},
		computed: {
			 
		},
		components: {
	      'v-topbar': topbarTpl,
	      'v-body' : bodyTpl
	    }
	});
	
});
