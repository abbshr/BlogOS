	
module.exports = function (req, res) {
	req.session.user = null,
	req.flash('success', '你已经登出系统~');
	res.redirect('/');
};
