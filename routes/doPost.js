var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js'),
    AppInfo = require('../models/appinfo.js');
	
module.exports = function (req, res) {
		if (req.body.title == 0 && !(/0/i).test(req.body.title)) {    //防止空标题
			req.flash('error', '请填写标题~');
			return res.redirect('/post');
		}
		var currentuser = req.session.user,
			md5 = crypto.createHash('md5'),
			email_MD5 = md5.update(currentuser.email.toLowerCase()).digest('hex'),
		    headimg = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48",
		    regexp = /,|，/,
		    tags = checkSpace(req.body.tags),   //去除首末空格
		    tags = checkSpecialChar(tags),      //去除特殊字符
		    tags = String.prototype.split.call(tags, regexp, 5),  //最多五个标签
		    title = checkSpace(req.body.title); //去除首末空格
		    if (req.body.tags) {
		    	tags = getRealTags(tags);  //得到规范标签
		    }    
		    post = new Post(currentuser.name, headimg, title, tags, req.body.post);
		    
		post.save(function (err) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			AppInfo.incPostsNum(function (err) {
				if (err) {
					req.flash('error', err);
					return res.redirect('/');
				}
				req.flash('success', '发布成功 :)');
				res.redirect('/');
			});
		});
};
