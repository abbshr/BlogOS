	
module.exports = function(req, res) {
	res.render('reg', { 
		title: 'Root注册',
		user: req.session.admin,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()	
	});
};
