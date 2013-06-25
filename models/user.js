

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
		realname: null,
		message: [],
		qq: null,
		address: null,
		college: null,
		sex: null,
		website: '',
		tags: []
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

User.auth = function (name, callback) {
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
			collection.findOne({name: name}, function (err, doc) {
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
			var query = {};
			if (name) {
				query.name = name;
			}
			//查找用户名name，值为name的数据块
			collection.find(query, function (err, doc) {
				mongodb.close();
				if (doc) {
					callback(err, user);   //成功，返回查询用户信息
				} else {
					callback(err, null);   //失败，返回null
				}
			});
		});
	});
};


User.control = function (name, callback) {            //提供用户信息修改接口
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('users', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//更新用户信息
			collection.update({"name": name}, user, function (err) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});   
			
		});
	});
};

User.delete = function (name, callback) {
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('users', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			if (name) {
				query.name = name;
			}
			collection.remove(query, function (err) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
};

