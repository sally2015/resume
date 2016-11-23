define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue');
	return Vue.extend({
		template: '#tpl-header',
		data: function() {
			return {
				testData: 'test'
			}
		}
	});
});
