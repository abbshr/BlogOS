var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {         //用户提交修改信息
	if (req.session.admin || (req.session.user && req.session.user.name === req.params.name)) {
		var user = {},
			regexp = /,|，/;
		for (var i in req.body) {
			user[i] = req.body[i];
		}
		user['tags'] = String.prototype.split.call(user['tags'], regexp, 10);
		User.control(req.params.name, user, function (err) {
			if (err) {
				req.flash('error', err);
			} else {
				req.flash('success', '修改成功:)');
			}
			res.redirect('/profile/' + req.params.name);
		});
	} else {
		req.flash('error', '你目前无权操作！~');
		res.redirect('/profile/' + req.params.name);
	}
};
