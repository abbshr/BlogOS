var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {   //获取修改一篇文章的页面
		if (req.session.user.name !== req.params.name) {
			req.flash('error', "……zzz");
			res.redirect('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title);
		}
		Post.getOne(false, req.session.user.name, req.params.name, req.params.day, req.params.title, function (err, post) {
			if (err) {
				req.flash('error', err);
				res.redirect('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title);
			}
			post.tags = post.tags.join(',');
			res.render('post', {
				title: '修改文章',
				post: post,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
};
