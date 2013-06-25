var Admin = require('../models/admin.js');
	
module.exports = function (req, res) {
	Admin.get(null, 

	res,render('getmongo', {
		title: BlogOS-DataBase ControlPanle,
		user: req.session.admin,
		database: 
		success: req.flash('success').toString(),
		error: req.flash('error').toString(),
	}););
};
