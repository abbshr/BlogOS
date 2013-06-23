function checkSpecialChar(str) {   //检测并清除字符串中的特殊字符，例如：“空格 ^ # % & + - / \ =”
	str = str.replace(/\#|\%|\&|\+|\-|\\|\/|\=|\^|\s/g, '');
	return str;
}

module.exports = checkSpecialChar;
