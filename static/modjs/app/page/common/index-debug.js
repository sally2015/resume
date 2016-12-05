define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue'),
		layoutMixin = require('/page/common/layout-mixin'),
		env = window.location.host.charAt(0);

		Vue.use(require('vue/2.1.x/vue-resource'));
		Vue.config.debug = env === 'l';
		Vue.mixin(layoutMixin);
});
