var crypto = require('crypto'),   //生成散列值来加密密码
	Admin = require('../models/admin.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	Admin.auth(req.body.name, function (err, admin) {
		if (!admin) {
			req.flash('error', '用户不存在！');
			return res.redirect('/adminlogin');
		}
		if (password !== admin.password) {
			req.flash('error', '密码错误 :(');
			return res.redirect('/adminlogin');
		}
		req.session.admin = admin;
		req.flash('success', '登录成功 :)');
		res.redirect('/admin');
	});
};
