//E:\ycx\git\resume\static\modjs\app\page\edit
define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue'),
		util = require('util/1.0.x/util'),
		MX = require('/vuex/mapmixin');

	//图片上传回调示例
	window.uploadImageCallbackFunc=function(result){
		console.log(result);
	};
		
	var options = {
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
                url:'files/images/test.jpg',
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
    };
	
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
		}
	}
	//自身方法
    var methods = {
		photoSubmit: function(){
			console.log(11)
		}
	}
	var computedMix = util.extend(MX.mapState, MX.mapGetters, computedOptions);
	var methodsMix = util.extend(MX.mapMutations, MX.mapActions, methods);
	var bodyTpl = Vue.extend({
		template: '#tpl-body',
		data: function(){
			return {
				options: options
			}
		},
		computed: computedMix,
		methods: methodsMix,
		watch: {
			options: {
				handler: function(oldVal, newVal){
					this.changeResumeOptions(this.options);
				},
				deep:true
			}
		},
		directives: {
		  initStyle: {
		    inserted: function (el, binding) {
			   	var styleList;
				if (binding.value.bgColor) {
   					binding.value.backgroundColor = binding.value.bgColor;
   				}
			   	styleList = binding.value;
			   	for (var attr in styleList) {
			   		el.style[attr] = styleList[attr];
			   	}
			}
		}
	}
});
	return bodyTpl;

});