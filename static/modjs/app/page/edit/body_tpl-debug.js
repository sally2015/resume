define(function(require, exports, module) { 'use strict' 
	var Vue = require('vue/2.1.x/vue'),
		util = require('util/1.0.x/util'),
		MX = require('/vuex/mapmixin');

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
		}
	});
	return bodyTpl;

});