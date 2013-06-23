var crypto = require('crypto'),   //生成散列值来加密密码
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
	checkReg = require('./ctrlfunction/checkReg.js'),
	checkSpace = require('./ctrlfunction/checkSpace.js'),
	checkSpecialChar = require('./ctrlfunction/checkSpecialChar.js'),
	getRealTags = require('./ctrlfunction/getRealTags.js');
	
module.exports = function (req, res) {   //删除文章或提交评论
		if (req.body.delete && req.session.user.name === req.params.name) {
			var post = {};
			for (var i in req.params) {
				post[i] = req.params[i];
			}
			Post.deleteOne(post, function (err) {
				if (err) {
					req.flash('error', err);
				} else {
					req.flash('success', "删除成功~");
				}
				res.redirect('/u/' + req.session.user.name);
			});	
		}
		var date = new Date(),
			time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
			md5 = crypto.createHash('md5'),
		    	email_MD5 = md5.update(req.session.user.email.toLowerCase()).digest('hex'),
		    	headimg = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48",
			comment = {
				"name": req.session.user.name,
				"headimg": headimg,
				"time": time,
				"content": req.body.content, 
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
};
