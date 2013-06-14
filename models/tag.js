//这个不需要了！注意更改index.js和post.js的内容

var mongodb = require('./db');

function Tag(name, tags) {
	this.name = name;
	this.tags = tags;
}

module.exports = Tag;

Tag.prototype.save = function (callback) {
	var name = this.name,
	    tags = this.tags;
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('users', function (err, collection) {  
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.findAndModify({"name": name}    //为当前用户添加标签
				, {"tags": tags}             //与原标签合并！
				, {new: true}
				, function (err, tags) {
					mongodb.close();
					if (err) {
						return callback(err);
					}
					callback(null);
				}
			);
		});
	});
};

Tag.getTags = function (name, callback) {
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('user', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			if (name) {
				query.name = name;
			}
			collection.distinct("tags", {query}, function (err, tagsarr) {
				mongodb.close();
				if (err) {	
					return callback(err, null);
				}
				callback(null, tagsarr);
			});
		});
	});
};
