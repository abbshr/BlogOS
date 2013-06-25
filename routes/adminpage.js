var crypto = require('crypto'),   //生成散列值来加密密码
	Admin = require('../models/admin.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {
	res.render('adminpage', {
		title: 'BlogOS ControlPanle 『Beta』',
		admin: req.session.admin,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
};
