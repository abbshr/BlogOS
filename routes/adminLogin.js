	
module.exports = function (req, res) {
	res.render('login', {
		title: '后台管理',
		user: req.session.admin,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
};
