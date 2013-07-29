var Admin = require('../models/admin.js');
	
module.exports = function (req, res) {
	Admin.deletePost(req.params.postname, function (err) {
		if (err) {
			req.flash('error', '删除操作失败~:(');
		} else {
			req.flash('success', '操作成功完成！');
		}
		res.redirect('/admin');
	});
};
