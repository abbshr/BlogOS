var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {
		var pagenum = req.query.page ? parseInt(req.query.page) : 1;
		//检查用户是否存在
		User.auth(req.params.name, function (err, user) {
			if (!user) {
				req.flash('error', '用户不存在 :(');
				return res.redirect('/');
			}
			
			//查询并返回该用户第pagenum页的15篇文章
			Post.getFifteen(user.name, pagenum, function (err, posts, tpages) {
				if (err) {
					req.flash('error', err);
					return res.redirect('/');
				}
				res.render('user', {
					title: user.name,
					currentuser: {
						name: req.params.name
					},
					posts: posts,
					pagenum: pagenum,
					tpages: tpages,
					user: req.session.user,
					success: req.flash('success').toString(),
					error: req.flash('error').toString()
				});
			});
		});
};
