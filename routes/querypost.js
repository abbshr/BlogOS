var crypto = require('crypto'),   //生成散列值来加密密码
	Admin = require('../models/admin.js'),
	checkRegExpChar = require('./ctrlfunction/checkRegExpChar.js');
	
module.exports = function (req, res) {
	postname = checkRegExpChar(req.query.postname);
	Admin.queryPost(postname, function (err, posts) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/admin');
		}
		res.render('search', {
			title: "搜索结果",
			posts: posts,
			admin: req.session.admin,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
};
