define(function (require, exports, module) { 'use strict';
	var Vuex = require('vue/2.1.x/vuex');

	//由于没有使用es6而对vuex进行的额外处理
	var mapState =  Vuex.mapState({
	    currentBasicBg: function(state) {
	    	return state.currentBasicBg;
	    },
      resumeOptions: function(state) {
        return state.resumeOptions;
      }
	});

	var mapGetters = Vuex.mapGetters(['getCurrentBasicBg','getResumeOptions']);

  var mapMutations = Vuex.mapMutations({
      CHANGE_BASIC_BG: function (state) {
  			  return state.CHANGE_BASIC_BG
  		},
      CHANGE_OPTIONS: function (state) {
          return state.CHANGE_OPTIONS
      }
  });

  var mapActions = Vuex.mapActions(['changeBasicBg','changeResumeOptions']);

  return {
   		mapState: mapState,
   		mapGetters: mapGetters,
   		mapMutations: mapMutations,
   		mapActions: mapActions
  }


});