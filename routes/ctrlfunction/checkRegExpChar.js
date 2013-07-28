function checkRegExpChar(str) {   //检测并清除正则字符串中的特殊字符，例如：“空格 ^ # % & + - / \ =”
	if (str) {
		str = str.replace(/\$|\*|\+|\-|\\|\/|\=|\^|\`|\(|\)|\?|\[|\]|\s/g, '');
		return str;
	} else {
		return '';
	}
}

module.exports = checkRegExpChar;
