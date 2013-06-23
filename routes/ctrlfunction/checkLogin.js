function checkLogin(req, res, next) {   //登录之后才能继续操作
	if (!req.session.user) {
		req.flash('error', '你尚未登录，无法进行这个操作！');
		return res.redirect('/login');
	}
	next();
}

module.exports = checkLogin;
