
module.exports = function (req, res, next) {
	if (!req.session.admin) {
		req.flash('error', '你尚未登录，无法进行这个操作！');
		return res.redirect('/adminlogin');
	}
	next();
};
