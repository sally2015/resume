define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue');
	return Vue.extend({
		template: '#tpl-footer',
		data: function() {
			return {
				linkData:['我是','底部','链接']
			}
		}
	});
});