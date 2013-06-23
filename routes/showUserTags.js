var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {
		Post.getTags(req.params.name, function (err, tags) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/u/' + req.params.name);
			}
			res.render('alltags', {
				title: req.params.name + '的标签集',
				tags: tags,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
};
