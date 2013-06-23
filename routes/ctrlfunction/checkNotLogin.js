function checkNotLogin(req, res, next) {  //未登录才能继续操作 
	if (req.session.user) {
		req.flash('error', '你已经登录！');
		return res.redirect('/');
	}
	next();
}

module.exports = checkNotLogin;
