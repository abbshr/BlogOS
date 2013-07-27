

var mongodb = require('./db');

function Comment(name, day, postmark, comment) {
	this.name = name;
	this.day = day;
	this.postmark = postmark;
	this.comment = comment;
}

module.exports = Comment;

Comment.prototype.save = function (callback) {
	var name = this.name,
		day = this.day,
		postmark = this.postmark,
		comment = this.comment;
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('posts', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.findAndModify({
				"name": name,
				"time.day": day,
				"postmark": postmark
				}, 
				[['time', -1]],
				{$push: {"comments": comment}},
				{new: true},
				function (err, comment) {
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
