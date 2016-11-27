'use strict';

define(function (require, exports, module) {
	'use strict';

	var Vue = require('vue/2.1.x/vue');
	return Vue.extend({
		template: '#tpl-header',
		data: function data() {
			return {
				isIndex: true
			};
		},
		computed: {
			isIndexNav: function isIndexNav() {
				var href = window.location.href,
				    re = /sub/g,
				    isIndexNav = re.test(href);
				return !isIndexNav;
			}
		}

	});
});