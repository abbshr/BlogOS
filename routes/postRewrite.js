var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {   //提交修改的一篇文章
		if (req.params.name !== req.session.user.name) {
			req.flash('error', '你不是用户本人~');
			res.redirect('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title);
		}
		var newpost = {},
		    oldpost = {};
		for (var j in req.params) {
			oldpost[j] = req.params[j];
		}
		for (var i in req.body) {
			newpost[i] = req.body[i];
		}
		newpost.name = req.session.user.name;
		Post.rewriteOne(oldpost, newpost, function (err) {
			if (err) {
				req.flash('error', err);
			} else {
				req.flash('success', "~:)");
			}
			res.redirect('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title);
		});
};
