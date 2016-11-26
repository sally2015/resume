define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue'),
		util = require('util/1.0.x/util'),
		MX = require('/vuex/mapmixin');

	// #ajax
	var data = {
		name: 'oby',
		location: 'guangzhou',
		phone: '18888888888',
		email: '1234455@qq.com'
	}

	var computedMix = util.extend(MX.mapState, MX.mapGetters);

	var bodyTpl = Vue.extend({
		template: '#tpl-body',
		data: function(){
			return {
				basicName: data.name,
				contactList: {
					location: data.location,
					phone: data.phone,
					email: data.email
				},
				currentBasicBg: ''
				
			}
		},
		computed: computedMix,
		methods: {
		}
	});
	return bodyTpl;

});