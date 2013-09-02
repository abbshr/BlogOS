function checkRegExpChar(str) {   //检测处理正则字符串中的特殊字符
	if (str) {
		var normalStr = '';
		for (var i in str)
			normalStr += (/\$|\*|\+|\-|\\|\/|\=|\^|\`|\(|\)|\?|\[|\]|\s/g).test(str[i]) ? 
					 ('\\' + str[i]) : str[i];   //待解决：反斜杠问题
		return normalStr;
	} else {
		return '';
	}
}

module.exports = checkRegExpChar;
