

var mongodb = require('./db');

function User(user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
}

module.exports = User;


User.prototype.save = function (callback) {    //存储用户信息
	//用户数据模型
	var user = {
		name: this.name,
		password: this.password,
		email: this.email,
		message: []
	};
	
	//打开数据库
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		//读取users集合
		db.collection('users', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//将用户插入users集合
			collection.insert(user, {safe: true}, function (err, user) {
				mongodb.close();
				callback(err, user);
			});
		});
	});
};


User.get = function (name, callback) {     //读取用户信息
	//打开数据库
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		//读取users集合
		db.collection('users', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//查找用户名name，值为name的数据块
			collection.findOne({
				name: name
			}, function (err, doc) {
				mongodb.close();
				if (doc) {
					var user = new User(doc);
					callback(err, user);   //成功，返回查询用户信息
				} else {
					callback(err, null);   //失败，返回null
				}
			});
		});
	});
};
