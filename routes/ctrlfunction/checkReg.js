function checkReg(name, password, email) {   //检测注册信息格式
	var patternname = /\#|\%|\&|\+|\-|\\|\/|\=|\^|\s|\@|\`|\$|\.|\?|\,|\<|\>|\;|\:|\'|\"/,
	    patternkey = /\s/g,
	    patternemail = /(\w+)@[\w.]+/;
	if (!patternname.test(name) && !patternkey.test(password) && patternemail.test(email)) {
		return false;    //格式正确返回false
	}
	return true;
}

module.exports = checkReg;
