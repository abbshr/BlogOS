var crypto = require('crypto'),   //生成散列值来加密密码
	Admin = require('../models/admin.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js'),
	rootInfo = require('../rootinfo.js'),
    AppInfo = require('../models/appinfo.js');
	
module.exports = function (req, res) {
	var name = req.body.name,
		password = req.body.password,
		password_rep = req.body['password-repeat'],
		email = req.body.email,
		rootkey = req.body.rootkey;
			
	if (checkReg(name, password, email)) {
		req.flash('error', "填写格式有误~请按标准格式填写！");
		return res.redirect('/adminreg');
	}	
	if (password !== password_rep) {
		req.flash('error', '两次输入的密码不一致！');
		return res.redirect('/adminreg');
	}
	if (rootkey != rootInfo.rootkey) {
		req.flash('error', '邀请码不存在~');
		return res.redirect('/adminreg');
	}	
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	var newAdmin = new Admin({
		name: req.body.name,
		password: password,
		email: req.body.email
	});
	
		//检测用户是否已经存在
	Admin.auth(newAdmin.name, function (err, user) {
		if (user) {
			err = "该root已存在！";
		}
		if (err) {
			req.flash('error', err);
			return res.redirect('/adminreg');
		}
			
		newAdmin.save(function (err) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/adminreg');
			}
			AppInfo.incAdminsNum(function (err) {
				if (err) {
					req.flash('error', err);
					return res.redirect('/adminreg');
				}
				req.session.admin = newAdmin;  //管理员信息存入session中
				req.flash('success', '注册成功 :)');
				res.redirect('/admin');
			});
		}); 
	});
};
