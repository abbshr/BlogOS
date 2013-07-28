
var Admin = require('../models/admin.js');
	
module.exports = function (req, res) {
	res.render('getappinfo', {
		title: '应用状态',
		admin: req.session.admin,
		success: req.flash('success').toString,
		error: req.flash('error').toString
	});
};
