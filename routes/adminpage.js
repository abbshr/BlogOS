var Admin = require('../models/admin.js');
	
module.exports = function (req, res) {
	Admin.getAppInfo(function (err, appinfo) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/');
		}
		res.render('adminpage', {
			title: 'BlogOS ControlPanle 『Beta』',
			appInfo: appinfo[0],
			admin: req.session.admin,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
};
