

var mongodb = require('./db'),
	markdown = require('markdown').markdown;

function Post(name, title, post) {
	this.name = name;
	this.title = title;
	this.post = post;
}

module.exports = Post;

Post.prototype.save = function (callback) {  //存储一篇文章以及相关信息
	var date = new Date();
	
	//存储各种时间格式，以便扩展
	var time = {
		date: date,
		year: date.getFullYear(),
		month: date.getFullYear() + '-' + (date.getMonth() + 1),
		day: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
		minute: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
	};
	
	//要存入数据库的文章及信息
	var post = {
		name: this.name,
		time: time,
		title: this.title,
		post: this.post,
		comments: []
	};
	
	//打开数据库
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		
		//读取posts集合
		db.collection('posts', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			
			//将文章插入数据库集合posts
			collection.insert(post, {
				safe: true
			}, function (err, post) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
};


Post.getAll = function (name, callback) {    //读取一个用户的所有文章及相关信息
	//打开数据库
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		
		//读取posts集合
		db.collection('posts', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			if (name) {
				query.name = name;
			}
			
			//根据query对象查询文章，按降序存在数组里
			collection.find(query).sort({
				time: -1
			}).toArray(function (err, docs) {
				mongodb.close();
				if (err) {
					callback(err, null);  //若失败返回null
				}
				//解析markdown为html
				docs.forEach(function (doc) {
					doc.post = markdown.toHTML(doc.post);
				});
				callback(null, docs);     //成功则以数组形式返回查询结果
			});
		});
	});
};

Post.getOne = function (name, day, title, callback) {   //获取一篇文章
	//打开数据库
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		
		//读取posts集合
		db.collection('posts', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			
			//根据用户名、发表日期、文章标题进行查询
			collection.findOne({
				"name": name,
				"time.day": day,
				"title": title
			}, function (err, doc) {
				mongodb.close();
				if (err) {
					return callback(err, null);
				}
				
				//解析markdown为html
				if (doc) {
					doc.post = markdown.toHTML(doc.post);
					if (doc.comments) {
						doc.comments.forEach(function (comment) {
							comment.content = markdown.toHTML(comment.content);	
						});
					}
				}
				callback(null, doc);   //返回特定的查询文章
			});
		});
	});
};