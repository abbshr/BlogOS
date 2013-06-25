
module.exports = function (req, res, next) {
	if (req.session.admin) {
		req.flash('error', '你已经登录，无法进行这个操作！');
		return res.redirect('/admin');
	}
	next();
};
