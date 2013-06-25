var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {
		User.auth(req.params.name, function (err, user) {
			if (!user) {
				req.flash('error', '用户不存在 :(');
				return res.redirect('/');
			}
			Post.getArchive(user.name, function (err, posts) {
				if (err) {
					req.flash('error', err);
					res.redirect('/');
				}
				res.render('archive', {
					title: user.name,
					currentuser: user.name,
					posts: posts,
					user: req.session.user,
					success: req.flash('success').toString(),
					error: req.flash('error').toString()
				});
			});
		});
};
