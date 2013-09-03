var crypto = require('crypto'),
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
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
		var title = checkSpace(req.body.title), //去除标题首末空格
			tags = String.prototype.split.call(req.body.tags, /,|，/); 
		if (!(req.body.tags == 0 && !(/0/i).test(req.body.tags)))
		    tags = getRealTags(tags);  //得到规范标签
		else
		    tags = [''];

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
