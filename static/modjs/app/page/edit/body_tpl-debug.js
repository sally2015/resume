//E:\ycx\git\resume\static\modjs\app\page\edit
define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue'),
		util = require('util/1.0.x/util'),
		MX = require('/vuex/mapmixin'),
		$ = require('dom/1.1.x/'),
		map = require('./map.js');

	var options={
			main:{
				bg:'green'
			},
			header:{
				name:"oby",
				style:{
					bgColor:'blue',
					fontSize:30,
					color:'#fff',
					left:20,
					top:20
				},
				city:{
					name:'广州',
					style:{
						color:'#fff',
						left:300,
						top:20
					}
				},
				phone:{
					name:'13710842956',
					style:{
						color:'#fff',
						left:300,
						top:50
					}
				},
				email:{
					name:'675036198@qq.com',
					style:{
						color:'#fff',
						left:300,
						top:80
					}
				},
				avatar:{
					url:'files/images/test.jpg',
					style:{
						width:100,
						height:100,
						left:480,
						top:4
					}
				}
			},
			education:{
				name:"教育背景",
				style:{
					fontSize:30,
					color:'red',
					left:20,
					top:120
				},
				time:{
					name:'201309-201706',
					style:{
						left:160,
						top:120
					}
				},
				detail:{
					name:'广东工业大学',
					style:{
						left:300,
						top:120
					}
				},
				supplement:{
					name:'信息管理与信息系统',
					style:{
						left:400,
						top:120
					}
				},
				desc:{
					name:'这是描述',
					style:{
						left:160,
						top:200
					}
				}
			},
			project:{
				name:"项目经验",
				style:{
					fontSize:30,
					color:'black',
					left:20,
					top:260
				},
				time:{
					name:'201309-201706',
					style:{
						left:160,
						top:260
					}
				},
				detail:{
					name:'XXX项目',
					style:{
						left:300,
						top:260
					}
				},
				supplement:{
					name:'补充一下',
					style:{
						left:400,
						top:260
					}
				},
				desc:{
					name:'这是描述',
					style:{
						left:160,
						top:360
					}
				}
			},
			work:{
				name:"工作经验",
				style:{
					fontSize:30,
					color:'blue',
					left:20,
					top:440
				},
				time:{
					name:'201309-201706',
					style:{
						left:160,
						top:440
					}
				},
				detail:{
					name:'XXX公司',
					style:{
						left:300,
						top:440
					}
				},
				supplement:{
					name:'补充一下',
					style:{
						left:400,
						top:440
					}
				},
				desc:{
					name:'这是描述',
					style:{
						left:160,
						top:540
					}
				}
			},
			profession:{
				name:"专业技能",
				style:{
					fontSize:30,
					color:'green',
					left:20,
					top:640
				},
				desc:{
					name:'这是描述',
					style:{
						left:160,
						top:640
					}
				}
			},
			footer:{
				bgColor:'#222222',
				style:{
					height:40
				},
			}
	}
	//处理options
	var computedOptions = {
		contactList: function(){
			var headerList = this.options.header;
			var newList = [];
			for (var attr in headerList) {
				if (attr === 'city' || attr === 'phone' || attr === 'email') {
					newList.push(headerList[attr]);
				}
			}
			return newList;
		},
		moduleList: function(){
			var optionList = this.options;
			var newList = [];
			for (var attr in optionList) {
				
				if (attr === 'main' || attr === 'header' || attr === 'footer') {
					continue;
				}
				newList.push(optionList[attr]);
			}
			return newList;
		},
		computedSrc: function(){
			var url = this.imgSrc ? this.imgSrc : "images/test.jpg",
				index = url.indexOf('images/'),
				imgPath = 'files/'+url.substring(index);
				this.options.header.avatar.url = imgPath;

			return this.imgSrc;
		}
	}
	//自身方法
    var methods = {
		photoSubmit: function(){
			document.getElementById('photoSubmit').click();
		},
		uploadImageCallback: function(result){
			
			this.imgSrc =  result.url ;
		},
		register:function(){
			var url='./register';
			var params='username=admin@qq.com&email=admin@qq.com&pwd=admin';
			url+='?'+params;
			this.$http.get(url).then(function(result){
                console.log(result)
			});
		},
		login:function(){
			var url='./login';
			var params='username=admin@qq.com&pwd=admin';
			url+='?'+params;
			this.$http.get(url).then(function(result){
                console.log(result)
			});
		},
		logout:function(){
			var url='./logout';
			this.$http.get(url).then(function(result){
                console.log(result)
			});
		}
	}
	var computedMix = util.extend(MX.mapState, MX.mapGetters, computedOptions);
	var methodsMix = util.extend(MX.mapMutations, MX.mapActions, methods);

	var bodyTpl = Vue.extend({
		template: '#tpl-body',
		mounted: function(){ //组件初始化
			var vm = this;
			window.uploadImageCallbackFunc=function(result){
				vm.uploadImageCallback(result);
			}
			document.getElementById('save').addEventListener('click', function(){
				var url;

				vm.options.header.style.bgColor = map.radix[vm.currentBasicBg];

				url ='./save?'+'data='+encodeURIComponent(JSON.stringify(vm.options));
				vm.$http.get(url).then(function(result){
	                //debugger
				});
			});
		},
		data: function(){
			return {
				options: options,
				imgSrc: ""
			}
		},
		computed: computedMix,
		methods: methodsMix,
		directives: {
		  	initStyle: function (el, binding) {
				   	var computedStyle = {},
				   		scale = 0.8;

				   	map.attr.forEach(function(item){
				   		if(item === 'left' || item === 'top'){
				   			computedStyle[item] = parseInt( util.getPosition(el, item) ) * scale;
				   		}else if( item === 'backgroundColor' || item === 'color'){
				   			computedStyle[item] = util.RGBToHex( util.getStyle(el, item) );
				   		}else{
				   			computedStyle[item] = parseInt( util.getStyle(el, item) ) * scale;
				   		}
				   		
				   	});

					if (computedStyle.backgroundColor) {
	   					computedStyle.bgColor = computedStyle.backgroundColor;
	   					delete computedStyle.backgroundColor;
	   				}
				   	util.extend(binding.value, computedStyle); 	
				}
		}
	});
	return bodyTpl;

});
