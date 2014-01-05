

var mongodb = require('./db');

function Comment(id, comment, mention) {
	this.postId = id;
	this.comment = comment;
	this.mention = [];   //@功能开发中
}

module.exports = Comment;

Comment.prototype.save = function (callback) {
	var postId = this.postId,
		mention = this.mention,
		comment = this.comment;
	
	function openCallback(err, db) {
		if (err) return callback(err);
		db.collection('posts', getCollection);
	}

	function getCollection(err, collection) {
		if (err) {
			mongodb.close();
			return callback(err);
		}

		collection.findAndModify({
			'_id': postId
		}, [['time', -1]], {$push: {"comments": comment}}, {new: true}, commentCallback);
	}

	function commentCallback(err, comment) {
		mongodb.close();
		if (err) return callback(err);
		callback(null);
	}

	if (!mongodb.openCalled)
		mongodb.open(openCallback);
	else
		mongodb.collection('posts', getCollection);
};