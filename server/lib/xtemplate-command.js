/*!
 * Back2front
 * XTemplate commands
 */

'use strict';


var util = require('./util');

// 引入外部CSS
exports.importCSS = function(scope, option) {
	return '<link href="' + option.params[0] + '" media="all" rel="stylesheet" type="text/css" />';
};

// 引入外部JS
exports.importJS = function(scope, option) {
	return '<script src="' + option.params[0] + '"></script>';
};


// 对象是否存在
exports.exists = function(scope, option) {
	var obj = option.params[0], result = obj != null;
	if (result) {
		if ( Array.isArray(obj) ) {
			result = obj.length > 0;
		} else if (typeof obj === 'string') {
			result = obj.trim() !== '';
		} else if (obj.constructor === Object) {
			result = Object.keys(obj).length > 0;
		}
	}
	return result;
};


// 格式化数字，万以上都以万为单位显示
exports.formatNum = function(scope, option) {
	var num = Number(option.params[0]);
	var result;
	if (num < 10000) {
		result = num;
	} else {
		result = parseInt(num / 10000) + '万';
		if (num % 10000) { result += '+'; }
	}

	return result;
};

// 返回最大数字
exports.maxNumber = function(scope, option) {
	return Math.max.apply(Math, option.params);
};

// 返回最小正整数
exports.minPositiveNumber = function(scope, option) {
	var params = option.params.filter(function(num) {
		return num > 0;
	});
	return params.length === 1 ? params[0] : Math.min.apply(Math, params);
};


// 时间格式化
exports.formatDate = function(scope, option){
	var date = new Date(option.params[0] * 1000),
		format = option.params[1] || 'YYYY-MM-DD';

	var values = {
		Y: date.getFullYear(),
		M: date.getMonth() + 1,
		D: date.getDate(),
		h: date.getHours(),
		m: date.getMinutes(),
		s: date.getSeconds()
	};

	return format.replace(/Y+|M+|D+|h+|m+|s+/g, function(match) {
		var result = values[ match[0] ];
		if (match.length > 1 && result.toString().length !== match.length) {
			result = ( ( new Array(match.length) ).join('0') + result ).slice(-2);
		}
		return result;
	});
};

// 把时间格式化成距离当前时间多久
exports.formatDateFromNow = (function() {
	var timeUnits = [
			60,
			60 * 60,
			60 * 60 * 24,
			60 * 60 * 24 * 30,
			60 * 60 * 24 * 365
		],
		timespanTexts = [
			'刚刚',
			'分钟前',
			'小时前',
			'天前',
			'个月前',
			'年前'
		];

	return function(scope, option) {
		var date = new Date(option.params[0] * 1000), timespan = (new Date - date) / 1000;

		if (timespan < 0) {
			if (typeof date === 'number') { date = new Date(date); }
			return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
		}

		var cmpValue = 1, prevCmpValue
		for (var i = 0; i < timeUnits.length; i++) {
			prevCmpValue = cmpValue;
			cmpValue = timeUnits[i];
			if (timespan < cmpValue) {
				break;
			} else if (i === timeUnits.length - 1) {
				prevCmpValue = cmpValue;
			}
		}

		return (i ? parseInt(timespan / prevCmpValue) : '') + timespanTexts[i];
	};
})();


// 把数组内容连接为字符串
exports.joinArray = function(scope, option) {
	var arr = option.params[0], sep = option.params[1], prop = option.params[2];
	if (prop) {
		arr = arr.map(function(item) { return item[prop]; });
	}
	return arr.join(sep);
};

// 映射新数组
exports.mapArray = function(scope, option) {
	var arr = option.params[0], prop = option.params[1];
	if (typeof prop === 'string') {
		return arr.map(function(item) {
			return item[prop];
		});
	} else {
		return arr.map(function(item) {
			var result = { };
			prop.forEach(function(p) {
				result[p] = item[p];
			});
			return result;
		});
	}
};

// 返回固定长度的数组，元素不足时用null填充
exports.toFixedLengthArray = function(scope, option) {
	var len = option.params[1], arr = option.params[0].slice(0, len);
	while (arr.length < len) {
		arr.push(null);
	}
	return arr;
};

// 一维数组转成表格数据（二维数组），不足的单元格用null填充
exports.toTableData = function(scope, option) {
	var data = option.params[0],
		totalCols = option.params[1],
		result = [ ],
		start = 0,
		end;

	while (start < data.length) {
		end = start + totalCols;
		result.push( data.slice(start, end) );
		start = end;
	}

	// 补齐列数
	var lastRow = result[result.length - 1];
	while (lastRow.length < totalCols) {
		lastRow.push(null);
	}

	return result;
};


// 添加默认标签容器
exports.defaultWrap = function(scope, option) {
	var content = option.params[0], tagName = option.params[1];
	if (content != null) {
		content = String(content);
		if (content.trim() && content[0] !== '<') {
			content = '<' + tagName + '>' + content + '</' + tagName + '>';
		}
	}
	return content;
};

// 把换行符替换成HTML的br标签，空格转成&nbsp;
exports.plainTextToHTML = function(scope, option) {
	return util.htmlEscape(option.params[0])
		.replace(/\r?\n/g, '<br />')
		.replace(/\s{2,}/g, function(match) {
			return new Array(match.length + 1).join('&nbsp;');
		});
};


// JSON编码
exports.jsonEncode = function(scope, option) {
	var obj = option.params[0];
	return JSON.stringify(obj === undefined ? '' : obj);
};

// URI编码
exports.uriEncode = function(scope, option) {
	return encodeURIComponent(option.params[0]);
};


function resizeImg(url, width) {
	if (!url) { return; }
	return width ? url.replace(/(?:\.\d+)?\.([^.]+?)$/, '.' + width + '.$1') : url;
}
function px2rem(value) {
	return value / 100 + 'rem';
}

// 返回特定宽度的图片URL
exports.resizeImg = function(scope, option) {
	return resizeImg(option.params[0], option.params[1]);
};

// 在特定宽高区域内显示图片的中央区域，如果图片不够大则拉伸
// (类似于CSS的 background-size:cover)
exports.imgBox = function(scope, option) {
	var img = option.params[0],
		box = option.params[1],
		title = option.params[2],
		lazyload = option.params[3],
		imgSize;

	if (img) {
		if (box.w && !box.h) {
			box.h = box.w * img.h / img.w;
		} else if (box.h && !box.w) {
			box.w = img.w * box.h / img.h;
		}

		var boxWidthZoomHeight = {
				w: box.w,
				h: (box.w / img.w * img.h).toFixed(0)	// 以box的宽度等比缩放算出图片的高度
			},
			boxHeightZoomWidth = {
				h: box.h,
				w: (box.h / img.h * img.w).toFixed(0)	// 以box的高度等比缩放算出图片的宽度
			};

		// 如果以box的宽度算出的图片高度大于等于box的高度，说明此尺寸下的图片能铺满box
		if (boxWidthZoomHeight.h >= box.h) {
			imgSize = boxWidthZoomHeight;
		}
		// 如果以box的高度算出的图片宽度大于等于box的高度，说明此尺寸下的图片能铺满box
		if (boxHeightZoomWidth.w >= box.w) {
			if (!imgSize || boxHeightZoomWidth.w < imgSize.w) {
				imgSize = boxHeightZoomWidth;
			}
		}
	}

	imgSize = imgSize || { w: 0, h: 0 };

	var html = '<span style="width:' + px2rem(box.w) + '; height:' + px2rem(box.h) + ';" class="img-box';
	if (img) {
		html += '"><img style="';

		if (lazyload) { html += 'display: none;' }

		var offsetLeft = 0, offsetTop = 0;
		if (imgSize.w) {
			html += 'width:' + px2rem(imgSize.w) + ';';
			offsetLeft = Math.floor( (box.w - imgSize.w) / 2 );
		}
		if (imgSize.h) {
			html += 'height:' + px2rem(imgSize.h) + ';';
			offsetTop = Math.floor( (box.h - imgSize.h) / 2 );
		}

		if (offsetTop) { html += 'margin-top:' + px2rem(offsetTop) + ';'; }
		if (offsetLeft) { html += 'margin-left:' + px2rem(offsetLeft) + ';'; }

		html += '"';
		if (title) { html += ' alt="' + util.htmlEscape(title) + '"'; }

		if (lazyload) {
			html += ' data-src="';
		} else {
			html += ' src="';
		}

		html += resizeImg(img.url, imgSize.w) + '" />';
	} else {
		html += ' img-box--no-img">';
	}

	return html + '</span>';
};


// 获取用户类型
exports.getUserType = function(scope, option) {
	var user = option.params[0];
	switch (user.type) {
		case 1:
			return ['common', 'daren', 'official', 'expert'][user.approve];

		case 2:
			return 'hospital';

		case 3:
			return 'doctor';
	}
};


// 替换表情文本为图片
exports.parseEmotion = (function() {
	var allEmotions = {
		'微笑': 'smile',
		'狂笑': 'hah',
		'亲亲': 'kiss',
		'抓狂': 'crazy',
		'害羞': 'shy',
		'抛媚眼': 'ogle',
		'偷笑': 'titter',
		'可怜': 'poor',
		'仰慕': 'adore',
		'再见': 'bye',
		'安慰': 'comfort',
		'鼓掌': 'clap',
		'酷': 'cool',
		'委屈': 'sad',
		'大哭': 'cry',
		'晕': 'dizzy',
		'流泪': 'tear',
		'臭美': 'smug',
		'奸笑': 'trick',
		'女王': 'queen',
		'扮鬼脸': 'joke',
		'呲牙': 'tooth',
		'发脾气': 'angry',
		'尴尬': 'awkward',
		'惊恐': 'fear',
		'祈祷': 'pray',
		'疑问': 'query',
		'衰': 'bad',
		'流汗': 'sweat',
		'撇嘴': 'curl',
		'奋斗加油': 'struggle',
		'拥抱': 'hug',
		'礼物': 'gift',
		'吃药恢复': 'sick',
		'握手': 'handshake',
		'强': 'powerful',
		'弱': 'weak',
		'勾引': 'seduce',
		'玫瑰': 'rose',
		'高兴得转圈': 'happy'
	};

	return function(scope, option) {
		return option.params[0].replace(/\[(.+?)\]/g, function(match, title) {
			var emotion = allEmotions[title];
			return emotion ?
				'<span class="emotion emotion-' + emotion + '" title="' + title + '"></span>' :
				match;
		});
	};
})();


// 处理页面标题
exports.fixPageTitle = function(scope, option) {
	var title = option.params[0];
	if (!title) {
		title = '美黛拉_最活跃的医美社区,美白瘦脸微整,只合作17年经验好医生';
	} else if ( !/^美黛拉/.test(title) && !/_美黛拉$/.test(title) ) {
		title += '_美黛拉手机版';
	}
	return title;
};


// 替换所有
exports.replaceAll = function(scope, option) {
	var str = option.params[0], 
		search = option.params[1],
		replacement = option.params[2];

	return str.split(search).join(replacement);
};


// 替换字符串中的变量占位符为数据中的对应属性值
exports.parseVars = function(scope, option) {
	var str = option.params[0] == null ? '' : String(option.params[0]), data = option.params[1];
	return str.replace(/\{\{(.*?)\}\}/g, function(match, $1) {
		return data[$1];
	});
};

// 组合专题过滤数据
exports.filterThemeData = function(scope, option) {
	var data = option.params[0],
		listData = [];

	data.forEach(function(v, i) {
		v.stock && listData.push(v.stock);
	});

	return listData;
};

// 计算专题图片组件高度
exports.imgTag = function(scope, option) {
	var photo = option.params[0],
		displayW = option.params[1],        // 图片展示宽度
		title = option.params[2] || '',
		imgH = Math.ceil(displayW * photo.h / photo.w ) / 100;
	return '<img' +
		' src="'+ resizeImg(photo.url, displayW) +'"' +
		' style="width:'+ (displayW / 100) +'rem;height:'+ imgH +'rem" ' +
		'alt="'+ title +'"/>';
};

// 计算价格（分）
exports.priceCent = function(scope, option) {
	var val = option.params[0];
	if (val == null) { return ''; }
	var price = Number(option.params[0]) || 0;
	return (price / 100).toFixed(2).replace('.00', '');
};

// 打印（调试用）
exports.print = function(scope, option) {
	console[option.params[1] || 'log'](option.params[0]);
};