define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue');
	
	return Vue.extend({
		template: '#tpl-header',
		data: function() {
			return {
				isIndex:true,
				isLogin: false
			}
		},
		computed:{
			isIndexNav: function(){
				var href = window.location.href,
					re = /edit/g,
					isIndexNav = re.test(href);
				return !isIndexNav;
			}
		},
		methods: {
			logout:function(){
				var url='./logout';
				this.$http.get(url).then(function(result){
	                console.log(result)
				});
			}
		}
	});
});
