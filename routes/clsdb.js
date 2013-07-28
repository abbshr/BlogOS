var Admin = require('../models/admin.js');
	
module.exports = function (req, res) {
	Admin.clearDataBase(function (err) {
		if (err) {
			req.flash('error', err);
			console.log(err);
		} else {
			console.log('**操作提示：在', Date(), '：*Admin清空数据库！*');
		}
		res.redirect('/admin');
	});
};
