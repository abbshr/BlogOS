var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {
		var lookname = null;
		if (req.session.user) {
			lookname = req.session.user.name;
		}
		Post.getOne(true, lookname, req.params.name, req.params.day, req.params.postmark, function (err, post) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			if (!post) {
				req.flash('error', '未找到:(');
				return res.redirect('/');
			}
			res.render('article', {
				title: post.title,
				currentuser: {
					name: req.params.name
				},
				post: post,
				user: req.session.user,
				admin: req.session.admin,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
};
