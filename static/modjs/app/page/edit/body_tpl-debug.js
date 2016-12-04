//E:\ycx\git\resume\static\modjs\app\page\edit
define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue'),
		util = require('util/1.0.x/util'),
		MX = require('/vuex/mapmixin'),
		$ = require('dom/1.1.x/')
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
				bgColor:'#4A86B9',
				style:{
					height:40
				},
			}
	}
	var test = {
		    "main": {
		        "bg": "green"
		    },
		    "header": {
		        "name": "oby",
		        "style": {
		            "bgColor": "blue",
		            "fontSize": 14,
		            "color": "#fff",
		            "left": 0,
		            "top": 0,
		            "width": 756,
		            "height": 78
		        },
		        "city": {
		            "name": "广州",
		            "style": {
		                "color": "#fff",
		                "left": 234,
		                "top": 30,
		                "fontSize": 16,
		                "width": 300,
		                "height": 26
		            }
		        },
		        "phone": {
		            "name": "13710842956",
		            "style": {
		                "color": "#fff",
		                "left": 234,
		                "top": 56,
		                "fontSize": 16,
		                "width": 300,
		                "height": 26
		            }
		        },
		        "email": {
		            "name": "675036198@qq.com",
		            "style": {
		                "color": "#fff",
		                "left": 234,
		                "top": 82,
		                "fontSize": 16,
		                "width": 300,
		                "height": 26
		            }
		        },
		        "avatar": {
		            "url": "files/images/test.jpg",
		            "style": {
		                "width": 100,
		                "height": 100,
		                "left": 480,
		                "top": 4
		            }
		        }
		    },
		    "education": {
		        "name": "教育背景",
		        "style": {
		            "fontSize": 14,
		            "color": "red",
		            "left": 0,
		            "top": 140,
		            "width": 756,
		            "height": 92
		        },
		        "time": {
		            "name": "201309-201706",
		            "style": {
		                "left": 194,
		                "top": 170,
		                "fontSize": 14,
		                "width": 160,
		                "height": 26
		            }
		        },
		        "detail": {
		            "name": "广东工业大学",
		            "style": {
		                "left": 378,
		                "top": 170,
		                "fontSize": 14,
		                "width": 160,
		                "height": 26
		            }
		        },
		        "supplement": {
		            "name": "信息管理与信息系统",
		            "style": {
		                "left": 562,
		                "top": 170,
		                "fontSize": 14,
		                "width": 160,
		                "height": 26
		            }
		        },
		        "desc": {
		            "name": "这是描述",
		            "style": {
		                "left": 194,
		                "top": 206,
		                "fontSize": 14,
		                "width": 548,
		                "height": 56
		            }
		        }
		    },
		    "project": {
		        "name": "项目经验",
		        "style": {
		            "fontSize": 14,
		            "color": "black",
		            "left": 0,
		            "top": 294,
		            "width": 756,
		            "height": 92
		        },
		        "time": {
		            "name": "201309-201706",
		            "style": {
		                "left": 194,
		                "top": 324,
		                "fontSize": 14,
		                "width": 160,
		                "height": 26
		            }
		        },
		        "detail": {
		            "name": "XXX项目",
		            "style": {
		                "left": 378,
		                "top": 324,
		                "fontSize": 14,
		                "width": 160,
		                "height": 26
		            }
		        },
		        "supplement": {
		            "name": "补充一下",
		            "style": {
		                "left": 562,
		                "top": 324,
		                "fontSize": 14,
		                "width": 160,
		                "height": 26
		            }
		        },
		        "desc": {
		            "name": "这是描述",
		            "style": {
		                "left": 194,
		                "top": 360,
		                "fontSize": 14,
		                "width": 548,
		                "height": 56
		            }
		        }
		    },
		    "work": {
		        "name": "工作经验",
		        "style": {
		            "fontSize": 14,
		            "color": "blue",
		            "left": 0,
		            "top": 448,
		            "width": 756,
		            "height": 92
		        },
		        "time": {
		            "name": "201309-201706",
		            "style": {
		                "left": 194,
		                "top": 478,
		                "fontSize": 14,
		                "width": 160,
		                "height": 26
		            }
		        },
		        "detail": {
		            "name": "XXX公司",
		            "style": {
		                "left": 378,
		                "top": 478,
		                "fontSize": 14,
		                "width": 160,
		                "height": 26
		            }
		        },
		        "supplement": {
		            "name": "补充一下",
		            "style": {
		                "left": 562,
		                "top": 478,
		                "fontSize": 14,
		                "width": 160,
		                "height": 26
		            }
		        },
		        "desc": {
		            "name": "这是描述",
		            "style": {
		                "left": 194,
		                "top": 514,
		                "fontSize": 14,
		                "width": 548,
		                "height": 56
		            }
		        }
		    },
		    "profession": {
		        "name": "专业技能",
		        "style": {
		            "fontSize": 14,
		            "color": "green",
		            "left": 0,
		            "top": 602,
		            "width": 756,
		            "height": 66
		        },
		        "desc": {
		            "name": "这是描述",
		            "style": {
		                "left": 194,
		                "top": 642,
		                "fontSize": 14,
		                "width": 56,
		                "height": 56
		            }
		        }
		    },
		    "footer": {
		        "bgColor": "#4A86B9",
		        "style": {
		            "height": 40
		        }
		    }
		}
	function getPosition(ele, attr){
		var map = {
			left: 'offsetLeft',
			top: 'offsetTop'
		}
		return ele[map[attr]]
	}
	function RGBToHex(rgb){ 
	   var regexp = /[0-9]{0,3}/g;  
	   var re = rgb.match(regexp);//利用正则表达式去掉多余的部分，将rgb中的数字提取
	   var hexColor = "#"; var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];  
	   for (var i = 0; i < re.length; i++) {
	        var r = null, c = re[i], l = c; 
	        var hexAr = [];
	        while (c > 16){  
	              r = c % 16;  
	              c = (c / 16) >> 0; 
	              hexAr.push(hex[r]);  
	         } hexAr.push(hex[c]);
	         if(l < 16&&l != ""){        
	             hexAr.push(0)
	         }
	       hexColor += hexAr.reverse().join(''); 
	    }  
	   //alert(hexColor)  
	   return hexColor;  
	} 
	var map = ['left', 'top','fontSize','color','backgroundColor','width','height'];
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
			var url = this.imgSrc,
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
		callback: function(result){
			
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
				vm.callback(result);
			}
			document.getElementById('save').addEventListener('click', function(){
				var url='./save?'+'data='+encodeURIComponent(JSON.stringify(test));
				console.log(JSON.stringify(test))
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
		  initStyle: {
		    inserted:  function (el, binding) {
			   	var computedStyle = {};
			   	map.forEach(function(item){
			   		if(item === 'left' || item === 'top'){
			   			computedStyle[item] = parseInt( getPosition(el, item) );
			   		}else if( item === 'backgroundColor' || item === 'color'){
			   			return
			   		}else{
			   			computedStyle[item] = parseInt( util.getStyle(el, item) );
			   		}
			   		
			   	});
				if (computedStyle.backgroundColor) {
   					computedStyle.bgColor = computedStyle.backgroundColor;
   					delete computedStyle.backgroundColor;
   				}
			   	util.extend(binding.value, computedStyle);
			   	
			}
		}
	}
});
	return bodyTpl;

});