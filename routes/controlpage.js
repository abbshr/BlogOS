var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {      //个人中心
		if (!req.session.user) {
			req.flash('error', "你还没登录~");
			res.redirect('/login');
		}
		res.render('control', {
			title: '帐户设置',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
};
