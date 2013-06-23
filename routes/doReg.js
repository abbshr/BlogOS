var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');

module.exports = function (req, res) {
	var name = req.body.name,
		password = req.body.password,
		password_rep = req.body['password-repeat'],
		email = req.body.email;
			
	if (checkReg(name, password, email)) {
		req.flash('error', "填写格式有误~请按标准格式填写！");
		return res.redirect('/reg');
	}	
	if (password !== password_rep) {
		req.flash('error', '两次输入的密码不一致！');
		return res.redirect('/reg');
	}
		
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	var newUser = new User({
		name: req.body.name,
		password: password,
		email: req.body.email
	});
	
		//检测用户是否已经存在
	User.get(newUser.name, function (err, user) {
		if (user) {
			err = "用户已存在";
		}
		if (err) {
			req.flash('error', err);
			return res.redirect('/reg');
		}
			
		newUser.save(function (err) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/reg');
			}
			req.session.user = newUser;  //用户信息存入session中
			req.flash('success', '注册成功 :)');
			res.redirect('/');
		}); 
	});
};
