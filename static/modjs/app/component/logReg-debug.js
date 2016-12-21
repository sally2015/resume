define(function(require, exports, module) { 'use strict'
	var Vue = require('vue/2.1.x/vue'),
		util = require('util/1.0.x/util'),
		MX = require('/vuex/mapmixin');
		var sectionTipTimer = null;
		var computedOptions = {
			disableRe: function(){
				var pw = this.registerData.pw;
				var cpw = this.registerData.cpw;
				return (cpw !== pw) || !cpw
			},
			disableLog: function(){
				var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				var val = this.loginData.email.trim();
				var pw = this.loginData.pw.trim();
				return val ==="" || pw ==="" || !re.test(val);
			},
			isReEmail: function(){
				var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				var val = this.registerData.email;
				return !(!val || re.test(val))
			},
			isLogEmail: function(){
				var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				var val = this.loginData.email.trim();
				return val !== "" && !re.test(val)
			}
		}
		//自身方法
	    var methods = {
			changeModule: function(btn){
				this.isLoginModule = btn;
			},
			register:function(){
				// var url='./register';
				// var params='username='+this.registerData.email+
				// 			'&email='+this.registerData.email+
				// 			'&pwd='+this.registerData.pw;
				// url+='?'+params;
				// this.$http.get(url).then(function(result){
	            //     if (result.status === 200) {
	            //     	this.changeTipMsg("注册成功");
	            //     	document.getElementById('sectionTip').classList.add('show');
				//
	            //     	clearTimeout(sectionTipTimer);
	            //     	sectionTipTimer = setTimeout(function () {
	            //     		document.getElementById('sectionTip').classList.remove('show');
	            //     	},2000);
				//
	            //     };
				// }.bind(this))

				//测试代码--获取简历数据
				var url='./getResume';
				this.$http.get(url).then(function(result){
	                console.log(result);
				});
			},
			login:function(){
				var url='./login';
				var params='username='+this.loginData.email+
							'&pwd='+this.loginData.pw
				url+='?'+params;
				this.$http.get(url).then(function(result){
	                if (result.status === 200) {
	                	this.changeTipMsg("登录成功");
	                	document.getElementById('sectionTip').classList.add('show');

	                	clearTimeout(sectionTipTimer);
	                	sectionTipTimer = setTimeout(function () {
	                		document.getElementById('sectionTip').classList.remove('show');
	                	},2000);

	                };
				}.bind(this));
			}
		}
		var computedMix = util.extend(MX.mapState, MX.mapGetters, computedOptions);
		var methodsMix = util.extend(MX.mapMutations, MX.mapActions, methods);
	return Vue.extend({
		template: '#tpl-logReg',
		data: function() {
			return {
				isLoginModule: true,
				loginData:{
					email:'',
					pw:''
				},
				registerData:{
					email:'',
					pw:'',
					cpw:''
				},
				cpwError: true
			}
		},
		computed: computedMix,
		methods: methodsMix
	});
});
