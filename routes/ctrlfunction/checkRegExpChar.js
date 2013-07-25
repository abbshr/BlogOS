function checkRegExpChar(str) {   //检测并清除正则字符串中的特殊字符，例如：“空格 ^ # % & + - / \ =”
	str = str.replace(/\$|\*|\+|\-|\\|\/|\=|\^|\`|\(|\)|\?|\[|\]|\s/g, '');
	return str;
}

module.exports = checkRegExpChar;
