	
module.exports = function (req, res) {
	req.session.admin = null,
	req.flash('success', '你已经登出后台系统~');
	res.redirect('/');
};
