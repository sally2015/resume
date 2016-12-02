define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue'),
		util = require('util/1.0.x/util'),
		MX = require('/vuex/mapmixin');

	Vue.use(require('vue-resource'));

	//自身方法
    var methods = {
		changeColor: function(color) {
			this.changeBasicBg(color);
			this.isIndex = color;
		},
		save: function(){
			var url='./save?'+'data='+encodeURIComponent(JSON.stringify(this.resumeOptions));
			this.$http.get(url).then(function(result){
                //debugger
			});
		},
		photoSubmit: function(){
			
		}
	}
	var computedMix = util.extend(MX.mapState, MX.mapGetters);
	var methodsMix = util.extend(MX.mapMutations, MX.mapActions);
	var methodsMap = util.extend(methodsMix, methods);
	
	var topbarTpl = Vue.extend({
		template: '#tpl-topbar',
		data: function(){
			return {
				colorData: ['blue', 'green', 'brown'],
				isIndex: 'blue'
			}
		},
		computed: computedMix,
		methods: methodsMap
	});

	return topbarTpl;

});