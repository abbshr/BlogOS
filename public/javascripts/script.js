/**
	@applysite：BlogOS
	@功能：初始化+获取应用对象
	@时间：2013.6.26
	@作者：Ran Aizen
	@name：BlogOS-InitLib
**/

(function () {
	var BlogOS = {
		init: function () {
		  window.onload = function () {
			BlogOS.loopByTag('img', BlogOS.standardImage, function (img) {
				if (!img.className && img.width > 600) 
					return true;
				return false;
			});
			BlogOS.loopByTag('input', BlogOS.bind, function (elem) {
				if (elem.getAttribute('class') === 'search' || elem.getAttribute('name') ==='tags')
				return true;
			});
		  };
			delete this.init;
			return this;
		},
		
		standardImage: function (img) {
			var realwidth = img.width,
				realheight = img.height,
				stdwidth = document.getElementsByTagName('header')[0].offsetWidth;
			var limit = stdwidth / realwidth;
			stdheight = realheight * limit;
			img.width = stdwidth;
			img.height = stdheight;
			return img;
		},
		
		resetContent: function (content) {
			var preheight = content.offsetHeight,
				stdHeight = content.offsetWidth * 0.8;
			content.offsetHeight = stdheight;
			var contenthref = document.createElement('a');
			contenthref.href = content.getElementsByTagName('a')[0].href;
			contenthref.innerHTML = '阅读全文';
			contenthref.appendChild(content);
			return content;
		},
		
		loopByTag: function (elementstr, callback, relyOn) {
			var ele = document.getElementsByTagName(elementstr),
				elelength = ele.length,
				newele = [];
			for (var i = 0, j = 0; i < elelength; i++) {
				if (relyOn && relyOn(ele[i])) {
					newele[j] = callback(ele[i]) || {};
					j++;
				}
			}
			return newele;
		},
		
		loopByClass: function (classstr, callback, relyOn) {
			var ele = document.getElementsByClassName(classstr),
				elelength = ele.length,
				newele = [];
			for (var i = 0, j = 0; i < elelength; i++) {
				if (relyOn && relyOn(ele[i])) {
					newele[j] = callback(ele[i]) || {};
					j++;
				}
			}
			return newele;
		},
		
		bind: function (elem) {
			elem.onsubmit = function () {
				BlogOS.encode(elem);
			};
		},
		
		encode: function (elem) {
			elem.value = escape(elem.value);
		}
	};
	
	this.BlogOS = BlogOS;
	return BlogOS;
})().init();
