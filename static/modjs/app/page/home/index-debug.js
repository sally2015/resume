define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue'),
		util = require('util/1.0.x/util'),
		store = require('/vuex/store'),
		MX = require('/vuex/mapmixin');

	var vm = new Vue({
		el: '#app',
		store: store
	});
	
});
