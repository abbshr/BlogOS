


var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js');

module.exports = function(app) {
	app.get('/', function (req, res) {
		//解析页数，并把请求的页数转换为number类型
		var pagenum = req.query.page ? parseInt(req.query.page) : 1;
		//查询并返回第pagenum页的15篇文章
		Post.getFifteen(null, pagenum, function (err, posts, tpages) {
			if (err) {
				posts = [];
			}
			res.render('index', {
				title: '主页',
				user: req.session.user,
				posts: posts,
				pagenum: pagenum,
				tpages: tpages,
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
		    regexp = /,|，/,
		    tags = String.prototype.split.call(req.body.tags, regexp, 5),  //最多五个标签
		    post = new Post(currentuser.name, req.body.title, tags, req.body.post);
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
		var pagenum = req.query.page ? parseInt(req.query.page) : 1;
		//检查用户是否存在
		User.get(req.params.name, function (err, user) {
			if (!user) {
				req.flash('error', '用户不存在 :(');
				return res.redirect('/');
			}
			
			//查询并返回该用户第pagenum页的15篇文章
			Post.getFifteen(user.name, pagenum, function (err, posts, tpages) {
				if (err) {
					req.flash('error', err);
					return res.redirect('/');
				}
				res.render('user', {
					title: user.name,
					currentuser: req.params.name,
					posts: posts,
					pagenum: pagenum,
					tpages: tpages,
					user: req.session.user,
					success: req.flash('success').toString(),
					error: req.flash('error').toString()
				});
			});
		});
	});
	app.get('/u/:name/:day/:title', function (req, res) {
		Post.getOne(req.session.user.name,req.params.name, req.params.day, req.params.title, function (err, post) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			res.render('article', {
				title: req.params.title,
				currentuser: req.params.name,
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
	app.get('/u/:name/archive', function (req, res) {
		User.get(req.params.name, function (err, user) {
			if (!user) {
				req.flash('error', '用户不存在 :(');
				return res.redirect('/');
			}
			Post.getArchive(user.name, function (err, posts) {
				if (err) {
					req.flash('error', err);
					res.redirect('/');
				}
				res.render('archive', {
					title: user.name,
					currentuser: user.name,
					posts: posts,
					user: req.session.user,
					success: req.flash('success').toString(),
					error: req.flash('error').toString()
				});
			});
		});
	});
	app.get('/tags', function (req, res) {
		Post.getTags(null, function (err, tags) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			res.render('alltags', {
				title: '探索你感兴趣的话题:)',
				tags: tags,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	app.get('/tags/:tagname', function (req, res) {
		Post.getTagPage(null, req.params.tagname, function (err, posts) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			res.render('tagpage', {
				title: '相关话题：' + req.params.tagname,
				posts: posts,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	app.get('/u/:name/tags', function (req, res) {
		Post.getTags(req.params.name, function (err, tags) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/u/' + req.params.name);
			}
			res.render('alltags', {
				title: req.params.name + '的标签集',
				tags: tags,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	/*app.get('/u/:name/tags/:tagname', function (req, res) {
		Post.getTagPage(req.params.name, req.params.tagname, function (err, posts) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			res.render('tagpage', {
				title: req.params.name + '参与的话题：' + req.params.tagname,
				posts: posts,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString() 
			});
		});
	});*/
	//以上这段出现较严重问题：地址与/u/:name/:day/:title产生冲突，而这个地址在前面有所响应，所以这段相当于永远也执行不到
	//亟待解决：地址重叠问题，标题末尾空格问题，标签末尾空格倒置标签无法带入指定地址问题【添加自动干掉末尾多余空格功能】
	app.all('*', function (req, res) {    //添加404响应页面
		res.render('404');
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
