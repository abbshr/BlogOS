var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {      //个人中心
		User.get(false, req.params.name, function (err, user) {
			if (err) {
				req.flash('error', err);
				if (req.session.admin) {
					return res.redirect('/admin');
				} else {
					return res.redirect('/u/' + req.params.name);
				}
			}
			var tit = 'ta的档案';
			if (req.session.admin || (req.session.user && req.session.user.name === req.params.name)) {
				tit = '帐户设置';
			} 
			res.render('profile', {
				title: tit,
				currentuser: user[0],
				user: req.session.user,
				admin: req.session.admin,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
};
