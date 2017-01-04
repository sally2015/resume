define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue'),
	    util = require('util/1.0.x/util'),
		store = require('/vuex/store'),
		MX = require('/vuex/mapmixin'),
		topbarTpl = require('./toolbar_tpl-debug.js'),
		bodyTpl = require('./body_tpl-debug.js'),
		reviewTpl = require('./review_tpl-debug.js');

		
    var computedMix = util.extend(MX.mapState, MX.mapGetters);
    var methodsMix = util.extend(MX.mapMutations, MX.mapActions);
	var vm = new Vue({
		el: '#app',
		store: store,
		mounted: function(){
			
		},
		data:function(){
			return {
				currentBasicBg: ''
			}
		},
		watch: {
		},
		computed: computedMix,
		methods: methodsMix,
		components: {
	      'v-topbar': topbarTpl,
	      'v-body' : bodyTpl,
	      'v-review': reviewTpl
	    }
	});
	
});
