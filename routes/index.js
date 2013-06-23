

var checkLogin = require('./ctrlfunction/checkLogin.js'),
    checkNotLogin = require('./ctrlfunction/checkNotLogin.js'),
     
    //引入路由控制函数
    dash = require('./dash.js'),
    showReg = require('./showReg.js'),
    doReg = require('./doReg.js'),
    showLogin = require('./showLogin.js'),
    doLogin = require('./doLogin.js'),
    postpage = require('./postpage.js'),
    doPost = require('./doPost.js'),
    logout = require('./logout.js'),
    search = require('./search.js'),
    userpage = require('./userpage.js'),
    showArticle = require('./showArticle.js'),
    Commit = require('./Commit.js'),
    rewritepage = require('./rewritepage.js'),
    postRewrite = require('./postRewrite.js'),
    deletePost = require('./deletePost.js'),
    showArchive = require('./showArchive.js'),
    controlpage = require('./controlpage.js'),
    postUserInfo = require('./postUserInfo.js'),
    showAllTags = require('./showAllTags.js'),
    allTagArticles = require('./allTagArticles.js'),
    showUserTags = require('./showUserTags.js')

module.exports = function(app) {
	app.get('/', dash);
	
	app.get('/reg', checkNotLogin);
	app.get('/reg', showReg);
	app.post('/reg', checkNotLogin);
	app.post('/reg', doReg);
	
	app.get('/login', checkNotLogin);
	app.get('/login', showLogin);
	app.post('/login', checkNotLogin);
	app.post('/login', doLogin);
		
	app.get('/post', checkLogin);
	app.get('/post', postpage);
	app.post('/post', checkLogin);
	app.post('/post', doPost);
	
	app.get('/logout', checkLogin);
	app.get('/logout', logout);
	
	app.get('/search', search);
	
	app.get('/u/:name', userpage);
	
	app.get('/u/:name/:day/:title', showArticle);
	
	app.post('/u/:name/:day/:title', checkLogin);
	app.post('/u/:name/:day/:title', Commit);

	app.get('/u/:name/:day/:title/rewrite', checkLogin);
	app.get('/u/:name/:day/:title/rewrite', rewritepage);
	app.post('/u/:name/:day/:title/rewrite', checkLogin);
	app.post('/u/:name/:day/:title/rewrite', postRewrite);
	
	app.get('/u/:name/:day/:title/delete', checkLogin);
	app.get('/u/:name/:day/:title/delete', deletePost);
	
	app.get('/u/:name/archive', showArchive);
	
	app.get('/control', checkLogin);
	app.get('/control', controlpage);
	app.post('/control', checkLogin);
	app.post('/control', postUserInfo);
	
	app.get('/tags',showAllTags);
	app.get('/tags/:tagname', allTagArticles);
	
	app.get('/u/:name/tags', showUserTags);
	
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
