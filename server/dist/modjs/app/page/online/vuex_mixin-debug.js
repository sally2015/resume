'use strict';

define(function (require, exports, module) {
	'use strict';

	var store = require('/vuex/store');
	return {
		store: store,
		vuex: {
			getters: {
				currentBasicBg: getters.getCurrentBasicBg
			},
			actions: {
				changeBasicBg: actions.changeBasicBg
			}
		}
	};
});