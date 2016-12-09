define(function (require, exports, module) { 'use strict';
	var Vuex = require('vue/2.1.x/vuex');

	//由于没有使用es6而对vuex进行的额外处理
	var mapState =  Vuex.mapState({
	    currentBasicBg: function(state) {
	    	return state.currentBasicBg;
	    }
	});

	var mapGetters = Vuex.mapGetters(['getCurrentBasicBg','getTipMsg']);

  var mapMutations = Vuex.mapMutations({
      CHANGE_BASIC_BG: function (state) {
  			  return state.CHANGE_BASIC_BG
  		}
  });

  var mapActions = Vuex.mapActions(['changeBasicBg','changeTipMsg']);

  return {
   		mapState: mapState,
   		mapGetters: mapGetters,
   		mapMutations: mapMutations,
   		mapActions: mapActions
  }


});