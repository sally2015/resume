//E:\ycx\git\resume\static\modjs\app\page\edit
define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue'),
		util = require('util/1.0.x/util'),
		MX = require('/vuex/mapmixin');

	Vue.use(require('vue-resource'));

	// #ajax basic
	var data = {
		name: 'oby',
		location: 'guangzhou',
		phone: '18888888888',
		email: '1234455@qq.com'
	}
	//ajax content
	var moduleList = {
			education: {
				title:"教育背景",
				arr:{
					time: "201309-201706",
					name: "广东工业大学",
					others:"信息管理与信息系统",
					des:"这是描述"
				}
			},
			exp: {
				title:"项目经验",
				arr:{
					time: "201309-201706",
					name: "XXX项目",
					others:"补充一下",
					des:"这是描述"
				}
			},
			work: {
				title:"工作经验",
				arr:{
					time: "201309-201706",
					name: "XXX公司",
					others:"补充一下",
					des:"这是描述"
				}
			},
			skill: {
				title:"专业技能",
				arr:{
					// time: "",
					// name: "XXX公司",
					// others:"补充一下",
					des:"这是描述"
				}
			}
		};

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
				moduleList: moduleList
			}
		},
		computed: computedMix,
		methods: {
			save:function(){
				//var data=JSON.stringify(this.$data);
				//var url='./save?'+'data='+encodeURIComponent(data);
				var options={
					main:{
						bg:'green'
					},
					header:{
						name:"张三",
						style:{
							bgColor:'#4A86B9',
							fontSize:30,
							color:'red',
							left:20,
							top:20
						},
						city:{
							name:'广州',
							style:{
								left:300,
								top:20
							}
						},
						phone:{
							name:'13710842956',
							style:{
								left:300,
								top:50
							}
						},
						email:{
							name:'675036198@qq.com',
							style:{
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
				};
				var url='./save?'+'data='+encodeURIComponent(JSON.stringify(options));
				this.$http.get(url).then(function(result){
                    //debugger
				});
			},
			replaceBr: function(value){
				var newVal = value.replace(/\n/g,'<br>');
				return newVal;
			}
		}
	});
	return bodyTpl;

});