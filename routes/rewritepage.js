var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {   //获取修改一篇文章的页面
		if ((!req.session.user || req.session.user.name !== req.params.name) && !req.session.admin) {
			req.flash('error', "……zzz");
			res.redirect('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.postmark);
		}
		Post.getOne(false, req.params.name, req.params.name, req.params.day, req.params.postmark, function (err, post) {
			if (err) {
				req.flash('error', err);
				res.redirect('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.postmark);
			}
			if (!post) {
				req.flash('error', '未找到:(');
				return res.redirect('/');
			}
			post.tags = post.tags.join(',');
			res.render('post', {
				title: '修改文章',
				post: post,
				user: req.session.user,
				admin: req.session.admin,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
};
