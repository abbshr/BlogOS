var Admin = require('../models/admin.js');
	
module.exports = function (req, res) {
	Admin.refreshInfo(function (err) {
		if (err) {
			req.flash('error', err);
		} else {
			req.flash('success', '操作成功完成！');
		}
		res.redirect('/admin');
	});
};
