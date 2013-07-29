var Admin = require('../models/admin.js'),
	checkRegExpChar = require('./ctrlfunction/checkRegExpChar.js');
	
module.exports = function (req, res) {
	username = checkRegExpChar(req.query.username);
	Admin.queryUser(true, username, function (err, users) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/admin');
		}
		res.render('searchuser', {
			title: '搜索结果',
			users: users,
			admin: req.session.admin,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
};
