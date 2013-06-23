var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');

module.exports = function (req, res) {
	//解析页数，并把请求的页数转换为number类型
	var pagenum = req.query.page ? parseInt(req.query.page) : 1;
	//查询并返回第pagenum页的15篇文章
	Post.getFifteen(null, pagenum, function (err, posts, tpages) {
		if (err) {
			posts = [];
		}
		res.render('index', {
			title: 'DashBoard',
			user: req.session.user,
			posts: posts,
			pagenum: pagenum,
			tpages: tpages,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
}
