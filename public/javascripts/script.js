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
		
			this.loopByTag('img', this.standardImage, function (img) {
				if (!img.className && img.width > 600) { 
					return true;
				}
				return false;
			});
			
			this.loopByTag('div', this.resetContent, function (content) {
				var preheight = content.offsetHeight,
					stdHeight = content.offsetWidth * 0.8;
				if (preheight > stdHeight) {
					return true;
				}
				return false;
			});
			
			delete this.init;
			return this;
		},
		
		standardImage: function (img) {
			var realwidth = img.offsetWidth,
				realheight = img.offsetHeight,
				stdwidth = document.getElementsByTagName('header')[0].offsetWidth;
			var limit = stdwidth / realwidth;
			stdheight = realheight * limit;
			img.offsetWidth = stdwidth;
			img.offsetHeight = stdheight;
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
		}
	};
	
	this.BlogOS = BlogOS;
	return BlogOS;
})().init();
