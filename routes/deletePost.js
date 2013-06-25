var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');


module.exports = function (req, res) {
	if (req.session.user.name === req.params.name) {
		var post = {};
		post.name = req.params.name;
		post.title = req.params.title; 
		post["time.day"] = req.params.day;
		console.log(post);
		Post.delete(post, function (err) {
			if (err) {
				req.flash('error', err);
			} else {
				req.flash('success', "删除成功~");
			}
			res.redirect('/u/' + req.session.user.name);
		});	
	} else {
		req.flash('error', "你无权删除这篇文章~");
		res.redirect('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title);
	}
};
