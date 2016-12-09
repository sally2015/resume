define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue'),
		util = require('util/1.0.x/util'),
		MX = require('/vuex/mapmixin');
		var computedOPtions = {
			tipMsg: function(){
				return this.getTipMsg
			}
		}
		var computedMix = util.extend(MX.mapState, MX.mapGetters, computedOPtions);
		return Vue.extend({
			template: '#tpl-tips',
			computed: computedMix
		});
});