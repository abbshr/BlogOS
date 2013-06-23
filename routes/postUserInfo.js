var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {         //用户提交修改信息
		var user = {};
		for (var i in req.body) {
			user[i] = req.body[i];
		}
		user.name = req.session.user.name;
		User.control(user, function (err) {
			if (err) {
				req.flash('error', err);
			} else {
				req.flash('success', '修改成功:)');
			}
			res.redirect('/u/' + req.session.user.name);
		});
};
