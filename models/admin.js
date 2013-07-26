

var mongodb = require('./db'),
	User = require('./user'),
	Post = require('./post'),
	AppInfo = require('./appinfo.js');


function Admin(admin) {
	this.name = admin.name;
	this.password = admin.password;
	this.email = admin.email;
}

module.exports = Admin;


Admin.prototype.save = function (callback) {    //存储管理员信息
	var admin = {
		name: this.name,
		password: this.password,
		email: this.email,
		message: [],
		qq: null,
		website: '',
	};
	
	//打开数据库
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('admins', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.insert(admin, {safe: true}, function (err, admin) {
				mongodb.close();
				callback(err, admin);
			});
		});
	});
};

Admin.auth = function (name, callback) {
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		//读取admin集合
		db.collection('admins', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//查找用户名name，值为name的数据块
			collection.findOne({name: name}, function (err, doc) {
				mongodb.close();
				if (doc) {
					var admin = new Admin(doc);
					callback(err, admin);   //成功，返回查询用户信息
				} else {
					callback(err, null);   //失败，返回null
				}
			});
		});
	});
};

Admin.queryUser = User.get;      //指定用户名或null分别按用户名查询和显示所有

Admin.updateUser = User.control;

Admin.deleteUser = User.delete;    //按条件给定用户名或null删除指定或全部

Admin.deletePost = Post.delete;            //按条件给定文章或null删除指定或全部

Admin.queryPost = Post.search;              //指定{标题 | 作者 | 时间 | 标签}或null分别按条件查询和显示所有

Admin.updatePost = Post.rewrite;   

Admin.deleteAppInfo = AppInfo.deleteAppInfo;    //清空应用信息  

Admin.getAppInfo = AppInfo.getInfo;  //获取应用详细信息

Admin.refreshInfo = AppInfo.refreshInfo;   //刷新应用信息         

Admin.clearDataBase = function (callback) {     //清空数据库
	this.deleteUser(null, function (err) {
		Admin.deletePost(null, function (err) {
			Admin.deleteAppInfo(callback);
		});
	});
}; 
