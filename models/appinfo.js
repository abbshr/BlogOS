var mongodb = require('./db');

var AppInfo = {
	memery: false
};

module.exports = AppInfo;

AppInfo.getInfo = function (callback) {
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('app', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.find({}).toArray(function (err, docs) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, docs);
			});
		});
	});
};

AppInfo.refreshInfo = function (callback) {
	var appInfo = {};
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('admins', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.count(function (err, count) {
				appInfo.adminsnumber = count;
				
				db.collection('users', function (err, collection) {
					if (err) {
						mongodb.close();
						return callback(err);
					}
					collection.count(function (err, count) {
						appInfo.usersnumber = count;
						
						db.collection('posts', function (err, collection) {
							if (err) {
								mongodb.close();
								return callback(err);
							}
							collection.count(function (err, count) {
								appInfo.postsnumber = count;
								
								db.collection('app', function (err, collection) {
									if (err) {
										mongodb.close();
										return callback(err);
									}
									collection.update({}, {$set: appInfo}, true, function (err) {
										mongodb.close();
										if (err) {
											return callback(err);
										}
										callback(null);
									});
								});
							});
						});
					});
				});
			});
		});
	});	
};

AppInfo.incPv = function (callback) {
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('app', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			if (!AppInfo.memery) {
				collection.count(function (err, count) {
					if (!count) {
						collection.insert({}, function (err) {
							if (err) {
								mongodb.close();
								return callback(err);
							}
							collection.update({}, {$inc: {"pv": 1}}, {upsert: true, w: 1}, function (err) {
								mongodb.close();
								callback(null);
							});
						});
					}
					AppInfo.memery = true;
				});
			} else {
				collection.update({}, {$inc: {"pv": 1}}, {upsert: true, w: 1}, function (err) {
					mongodb.close();
					callback(null);
				});
			}
		});
	});
};

AppInfo.incUsersNum = function (callback) {
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('app', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.update({}, {$inc: {"usersnumber": 1}}, {upsert: true, w: 1}, function (err) {
				mongodb.close();
				callback(null);
			});
		});
	});
};

AppInfo.incPostsNum = function (callback) {
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('app', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.update({}, {$inc: {"postsnumber": 1}}, {upsert: true, w: 1}, function (err) {
				mongodb.close();
			 	callback(null);
			});
		});
	});
};

AppInfo.incAdminsNum = function (callback) {
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('app', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.update({}, {$inc: {"adminsnumber": 1}}, {upsert: true, w: 1}, function (err) {
				mongodb.close();
				callback(null);
			});
		});
	});
};

AppInfo.deleteAppInfo = function (callback) {
	var appInfo = {
		sitepv: 0,
		usersnumber: 0,
		adminsnumber: 0,
		postsnumber: 0
	};
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('app', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.update({}, {$set: appInfo}, {upsert: true, w: 1}, function (err) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
};
