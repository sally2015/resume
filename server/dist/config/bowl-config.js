'use strict';

!function (global) {
	'use strict';

	var libPath = '/modjs/lib';
	var appPath = '/modjs/app';
	var md5Map = {};

	global.bowljs.config({
		libPath: libPath,
		appPath: appPath,
		debug: true,
		map: [function (url) {
			var pathname = url.pathname.replace(/-debug(\.[^.]+)?$/, '$1'),
			    baseDir = '/modjs/',
			    i = pathname.indexOf(baseDir);

			if (i !== -1) {
				var md5 = md5Map[pathname.substr(i + baseDir.length)];
				if (md5) {
					url.pathname = url.pathname.replace(/\.js$/, function (match) {
						return '_' + md5 + match;
					});
				}
			}
		}]
	});
}(window);