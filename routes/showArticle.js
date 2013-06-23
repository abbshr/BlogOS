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
		Post.getOne(lookname, req.params.name, req.params.day, req.params.title, function (err, post) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			res.render('article', {
				title: req.params.title,
				currentuser: req.params.name,
				post: post,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
};
