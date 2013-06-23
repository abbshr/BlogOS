var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {    
	keyword = checkSpecialChar(req.query.keyword);
	Post.search(keyword, function (err, posts) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/');
		}
		res.render('search', {
			title: "搜索结果",
			posts: posts,
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
};
