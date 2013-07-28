
var Admin = require('../models/admin.js');
	
module.exports = function (req, res) {
	res.render('userctrl', {
		title: '用户管理',
		admin: req.session.admin,
		success: req.flash('success').toString,
		error: req.flash('error').toString
	});
};
