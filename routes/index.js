

var checkLogin = require('./ctrlfunction/checkLogin.js'),
    checkNotLogin = require('./ctrlfunction/checkNotLogin.js'),
    checkAdLogin = require('./ctrlfunction/checkAdLogin.js'),
    checkAdNotLogin = require('./ctrlfunction/checkAdNotLogin.js');
     
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
    showUserTags = require('./showUserTags.js'),
    
    adminReg = require('./adminReg.js'),
    doAdminReg = require('./doAdminReg.js'),
    adminLogin = require('./adminLogin.js'),
    doAdminLogin = require('./doAdminLogin.js'),
    adminlogout = require('./adminlogout.js'),
    adminpage = require('./adminpage.js'),
    
    getAppInfo = require('./getappinfo.js'),
    refreshInfo = require('./refreshinfo.js'),
    clearDataBase = require('./clsdb.js'),
    queryUser = require('./queryuser.js'),
    deleteUser = require('./deluser.js'),
    adDelPost = require('./addelpost.js'),
    queryPost = require('./querypost.js'),
    updatePost = require('./updatepost.js'),
    updateUser = require('./updateuser.js'),
    
    userCTRL = require('./userctrl.js'),
    postCTRL = require('./postctrl.js'),
    getMsg = require('./getmsg.js');

module.exports = function(app) {

	//管理员的操作
	
	app.get('/adminreg', checkAdNotLogin);
	app.get('/adminreg', adminReg);
	app.post('/adminreg', checkAdNotLogin);
	app.post('/adminreg', doAdminReg);
	
	app.get('/adminlogin', checkAdNotLogin);
	app.get('/adminlogin', adminLogin);
	app.post('/adminlogin', checkAdNotLogin);
	app.post('/adminlogin', doAdminLogin);
	
	app.get('/adminlogout', adminlogout);
	
	app.get('/admin', checkAdLogin);
	app.get('/admin', adminpage);
	
	app.get('/admin/appinfo', checkAdLogin);
	app.get('/admin/appinfo', getAppInfo);
	
	app.post('/admin/refinfo', checkAdLogin);
	app.post('/admin/refinfo', refreshInfo);
	
	app.post('/admin/clsdb', checkAdLogin);
	app.post('/admin/clsdb', clearDataBase);
	
	app.get('/admin/userctrl', checkAdLogin);
	app.get('/admin/userctrl', userCTRL);
	
	app.get('/admin/postctrl', checkAdLogin);
	app.get('/admin/postctrl', postCTRL);
	
	app.get('/admin/msgbox', checkAdLogin);
	app.get('/admin/msgbox', getMsg);
	
	app.get('/admin/queryuser', checkAdLogin);
	app.get('/admin/queryuser', queryUser);
	
	app.post('/admin/deluser', checkAdLogin);
	app.post('/admin/deluser', deleteUser);
	
	app.post('/admin/delpost', checkAdLogin);
	app.post('/admin/delpost', adDelPost);
	
	app.get('/admin/querypost', checkAdLogin);
	app.get('/admin/querypost', queryPost);
	
	app.get('/admin/updatepost', checkAdLogin);
	app.get('/admin/updatepost', rewritepage);
	app.post('/admin/updatepost', checkAdLogin);
	app.post('/admin/updatepost', updatePost);
	
	app.get('/admin/updateuser', checkAdLogin);
	app.get('/admin/updateuser', controlpage);
	app.post('/admin/updateuser', checkAdLogin);
	app.post('/admin/updateuser', updateUser);

	//普通用户操作
	
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
	
	app.get('/u/:name/:day/:postmark', showArticle);  
	
	app.post('/u/:name/:day/:postmark', checkLogin);   
	app.post('/u/:name/:day/:postmark', Commit);

	app.get('/u/:name/:day/:postmark/rewrite', checkLogin);
	app.get('/u/:name/:day/:postmark/rewrite', rewritepage);
	app.post('/u/:name/:day/:postmark/rewrite', checkLogin);
	app.post('/u/:name/:day/:postmark/rewrite', postRewrite);
	
	app.get('/u/:name/:day/:postmark/delete', checkLogin);  
	app.get('/u/:name/:day/:postmark/delete', deletePost);
	
	app.get('/u/:name/archive', showArchive);
	
	app.get('/profile/:name', controlpage);
	app.post('/profile/:name', postUserInfo);
	
	app.get('/tags', showAllTags);
	app.get('/tags/:tagname', allTagArticles);
	
	app.get('/u/:name/tags', showUserTags);
	
	//404响应页面
	
	app.all('*', function (req, res) {    
		res.render('404');
	});
};
