

var mongodb = require('./db'),
	markdown = require('markdown').markdown;

function Post(name, headimg, title, tags, post) {
	this.name = name;
	this.title = title;
	this.tags = tags;
	this.post = post;
	this.headimg = headimg;
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
		headimg: this.headimg,
		time: time,
		title: this.title,
		tags: this.tags,
		post: this.post,
		comments: [],
		pv: 0
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


Post.getFifteen = function (name, pagenum, callback) {    //一次读取15篇文章及相关信息
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
			
			var tposnum;    //获取po总数量
			collection.count(function (err, count) {
				tposnum = count;
			});
			
			var tpages = Math.ceil(tposnum/15);       //获取总页数
			
				//根据query对象查询文章，跳过前（pagenum - 1）*15个结果，返回后15个并按降序存在数组里
			collection.find(query, {skip: (pagenum - 1)*15, limit: 15}).sort({time: -1}).toArray(function (err, docs) {
				mongodb.close();
				if (err) {
					return callback(err, null);  //若失败返回null
				}
					//解析markdown为html
				docs.forEach(function (doc) {
					doc.post = markdown.toHTML(doc.post);
				});
				callback(null, docs, tpages);     //成功则以数组形式返回查询结果
			});
		});
	});
};

Post.getOne = function (flag, lookname, name, day, title, callback) {   //获取一篇文章,参数为false获取原版内容，为true时获取markdown转译内容
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
			//根据用户名、发表日期、文章标题进行查询
			if (lookname !== name) {
				query['pv'] = 1;
			}
			collection.findAndModify({   //增加pv
				"name": name,
				"time.day": day,
				"title": title 
			}, 
			[["time", -1]],
			{$inc: query}, 
			{new: true}, 
			function (err, doc) {
				mongodb.close();
				if (err) {
					return callback(err, null);
				}
					//解析markdown为html
				if (doc && flag) {
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

Post.getArchive = function (name, callback) {
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('posts', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.find({"name": name}).sort({time: -1}).toArray(function (err, docs) {
				mongodb.close();
				if (err) {	
					return callback(err);
				}
				callback(null, docs);
			});
		});
	});
};

Post.getTags = function (name, callback) {     //按用户名获取标用户签集
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('posts', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			if (name) {
				query.name = name;
			}
			collection.distinct("tags", query, function (err, tags) {
				mongodb.close();
				if (err) {
					return callback(err, null);
				}
				callback(null, tags);
			});
		});
	});
};

Post.getTagPage = function (name, tagname, callback) {   //通过用户和标签名获取标签页
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('posts', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {tags: tagname};
			if (name) {
				query.name = name;
			}
			collection.find(query).sort({time: -1}).toArray(function (err, docs) {
				mongodb.close();
				if (err) {
					return callback(err, null);
				}
				callback(null, docs);
			});
		});
	});
};

Post.search = function (keyword, callback) {     //搜索posts
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('posts', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			var pattern = new RegExp("^.*" + keyword + ".*$", "i"); //关键词模式匹配
			if (keyword) {
				query = {'$or': 
					[{'title': pattern},
					{'tags': pattern},
					{'time.day': pattern},
					{'name': pattern}
					]
				};
			}
			collection.find(query).sort({time: -1}).toArray(function (err, docs) {
				mongodb.close();
				if (err) {
					return callback(err, null);
				}
				callback(null, docs);
			});
		});
	});
};

Post.delete = function (post, callback) {       //删除文章
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('posts', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			if (post) {
				query = post;
			}
			collection.remove(query, function (err) {
				mongodb.close();
				if (err) {
					return callback (err);
				}
				callback(null);
			});
		});
	});
};

Post.rewriteOne = function (oldpost, newpost, callback) {    //修改一篇文章
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('posts', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.update(oldpost, {$set: newpost}, function (err) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback (null);
			});
		}); 
	});
};
