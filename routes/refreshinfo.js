var crypto = require('crypto'),   //生成散列值来加密密码
	Admin = require('../models/admin.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {
	Admin.refreshInfo(function (err, appinfo) {
		if (err) {
			req.flash('error', err);
		} else {
			req.flash('success', '操作成功完成！');
		}
		res.redirect('/admin');
	});
};
