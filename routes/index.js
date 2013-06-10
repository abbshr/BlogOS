

var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js');

module.exports = function(app) {
	app.get('/', function (req, res) {
		Post.getAll(null, function (err, posts) {
			if (err) {
				posts = [];
			}
			res.render('index', {
				title: '主页',
				user: req.session.user,
				posts: posts,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	app.get('/reg', checkNotLogin);
	app.get('/reg', function(req, res) {
		res.render('reg', { 
			title: '注册',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()	
		});
	});
	app.post('/reg', checkNotLogin);
	app.post('/reg', function (req, res) {
		var name = req.body.name,
			password = req.body.password,
			password_rep = req.body['password-repeat'];
			
		if (password !== password_rep) {
			req.flash('error', '两次输入的密码不一致！');
			return res.redirect('/reg');
		}
		
		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');
		var newUser = new User({
			name: req.body.name,
			password: password,
			email: req.body.email
		});
		
		//检测用户是否已经存在
		User.get(newUser.name, function (err, user) {
			if (user) {
				err = "用户已存在";
			}
			if (err) {
				req.flash('error', err);
				return res.redirect('/reg');
			}
			
			newUser.save(function (err) {
				if (err) {
					req.flash('error', err);
					return res.redirect('/reg');
				}
				req.session.user = newUser;  //用户信息存入session中
				req.flash('success', '注册成功 :)');
				res.redirect('/');
			}); 
		});
	});
	app.get('/login', checkNotLogin);
	app.get('/login', function (req, res) {
		res.render('login', {
			title: '登录',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	app.post('/login', checkNotLogin);
	app.post('/login', function (req, res) {
		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');
		User.get(req.body.name, function (err, user) {
			if (!user) {
				req.flash('error', '用户不存在！');
				return res.redirect('/login');
			}
			if (password !== user.password) {
				req.flash('error', '密码错误 :(');
				return res.redirect('/login');
			}
			req.session.user = user;
			req.flash('success', '登录成功 :)');
			res.redirect('/');
		});
	});	
	app.get('/post', checkLogin);
	app.get('/post', function (req, res) {
		res.render('post', {
			title: '发布',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	app.post('/post', checkLogin);
	app.post('/post', function (req, res) {
		var currentuser = req.session.user,
			post = new Post(currentuser.name, req.body.title, req.body.post);
		post.save(function (err) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			req.flash('success', '发布成功 :)');
			res.redirect('/');
		});
	});
	app.get('/logout', checkLogin);
	app.get('/logout', function (req, res) {
		req.session.user = null,
		req.flash('success', '你已经登出系统~');
		res.redirect('/');
	});
	app.get('/u/:name', function (req, res) {
		//检查用户是否存在
		User.get(req.params.name, function (err, user) {
			if (!user) {
				req.flash('error', '用户不存在 :(');
				return res.redirect('/');
			}
			
			//查询并返回该用户的所有文章
			Post.getAll(user.name, function (err, posts) {
				if (err) {
					req.flash('error', err);
					return res.redirect('/');
				}
				res.render('user', {
					title: user.name,
					posts: posts,
					user: req.session.user,
					success: req.flash('success').toString(),
					error: req.flash('error').toString()
				});
			});
		});
	});
	app.get('/u/:name/:day/:title', function (req, res) {
		Post.getOne(req.params.name, req.params.day, req.params.title, function (err, post) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			res.render('article', {
				title: req.params.title,
				post: post,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	app.post('/u/:name/:day/:title', checkLogin);
	app.post('/u/:name/:day/:title', function (req, res) {
		var date = new Date(),
			time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
			comment = {
				"name": req.session.user.name,
				"time": time,
				"content": req.body.content
			};
		var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment);
		newComment.save(function (err) {
			if (err) {
				req.flash('error', err);
				return res.redirect('back');
			}
			req.flash('success', '留言成功 :）');
			res.redirect('back');
		});
	});
};

function checkLogin(req, res, next) {   //登录之后才能继续操作
	if (!req.session.user) {
		req.flash('error', '你尚未登录，无法进行这个操作！');
		return res.redirect('/login');
	}
	next();
}

function checkNotLogin(req, res, next) {  //未登录才能继续操作 
	if (req.session.user) {
		req.flash('error', '你已经登录！');
		return res.redirect('/');
	}
	next();
}