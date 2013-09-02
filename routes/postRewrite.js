var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {   //提交修改的一篇文章
		if ((!req.session.user || req.params.name !== req.session.user.name) && !req.session.admin) {
			req.flash('error', '你不是用户本人~');
			res.redirect('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.postmark);
		}
		var newpost = {},
		    oldpost = {};
		if (req.body.title == 0 && !(/0/i).test(req.body.title)) {    //防止空标题
			req.flash('error', '请填写标题~');
			return res.redirect('/post');
		}
		oldpost.name = req.params.name;
		oldpost.postmark = req.params.postmark;
		oldpost['time.day'] = req.params.day;
		var regexp = /,|，/,
		    tags = checkSpace(req.body.tags),   //去除首末空格
		    //tags = checkSpecialChar(tags),      //去除特殊字符
		    tags = String.prototype.split.call(tags, regexp, 5),  //最多五个标签
			title = checkSpace(req.body.title); //去除首末空格
		if (req.body.tags) {
		    tags = getRealTags(tags);  //得到规范标签
		}
		newpost.title = title;
		newpost.tags = tags;
		newpost.name = req.params.name;
		newpost.post = req.body.post;
		Post.rewriteOne(oldpost, newpost, function (err) {
			if (err) {
				req.flash('error', err);
			} else {
				req.flash('success', "~:)");
			}
			res.redirect('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.postmark);
		});
};
