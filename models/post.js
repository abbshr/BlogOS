

var mongodb = require('./db'),
	markdown = require('markdown').markdown;

var paginate = require('../config.js');

function Post(name, headimg, title, tags, post) {
	this.name = name;
	this.title = title;
	this.tags = tags;
	this.post = post;
	this.headimg = headimg;
}

module.exports = Post;

//存储一篇文章以及相关信息
Post.prototype.save = function (callback) {  
	
    var date = new Date();
	
	//存储各种时间格式，以便扩展
	var time = {
		date: date,
		year: date.getFullYear(),
		month: 
            date.getFullYear() 
            + '-' 
            + (date.getMonth() + 1),
		day: 
            date.getFullYear() 
            + '-' 
            + (date.getMonth() + 1) 
            + '-' 
            + date.getDate(),
		minute: 
            date.getFullYear() 
            + '-' 
            + (date.getMonth() + 1) 
            + '-' 
            + date.getDate()
		    + '-' 
            + date.getHours() 
            + ':' 
            + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) 
            + ":" 
            + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds())
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
	
    function openCallback(err, db) {
        if (err)
            return callback(err);
        
        db.collection('posts', insertNew);
    }

    function insertNew(err, collection) {
        if (err) {
            mongodb.close();
            return callback(err);
        }
            
        collection.insert(post, {safe: true}, insertCallback);
    }

    function insertCallback(err, post) {
        mongodb.close();
        if (err)
            return callback(err);
        
        callback(null);
    }

    if (!mongodb.openCalled)
        mongodb.open(openCallback);
    else
        mongodb.collection('posts', insertNew);
};

//一次读取x篇文章及相关信息
Post.getSome = function (name, pagenum, paginate, callback) {    

    function (err, db) {
        if (err) return callback(err);
        db.collection('posts', getPosts);
    }

    function getPosts(err, collection) {

        function countCallback(err, count) {
            tposnum = count;
            tpages = Math.ceil(tposnum / paginate);      
            
            //根据query对象查询文章，跳过前（pagenum - 1）*15个结果，返回后15个并按降序存在数组里
            collection
                .find(query, {skip: (pagenum - 1) * paginate, limit: paginate})
                .sort({time: -1})
                .toArray(findCallback);
        }

        function findCallback(err, docs) {
            mongodb.close();
            if (err) return callback(err, null);  //若失败返回null
            //解析markdown为html
            docs.forEach(function (doc) {
                doc.post = markdown.toHTML(doc.post);
            });
            callback(null, docs, tpages);     //成功则以数组形式返回查询结果
        }

        if (err) {
            mongodb.close();
            return callback(err);
        }

        var query = {};
        if (name) query.name = name;
        
        var tposnum,    //获取po总数量
            tpages;     //获取总页数

        collection.count(countCallback);
    }

	if (!mongodb.openCalled)
        mongodb.open(openCallback);
    else
        mongodb.collection('posts', getPosts);
};

//获取一篇文章,参数为false获取原版内容，为true时获取markdown转译内容
Post.getOne = function (flag, lookname, name, day, postmark, callback) {   
	
    function openCallback(err, db) {
        if (err) return callback(err);        
        db.collection('posts', findCallback);
    }

    function getPost(err, collection) {
        if (err) {
            mongodb.close();
            return callback(err);
        }

        var query = {};
        //根据用户名、发表日期、文章标题进行查询
        if (lookname !== name) query['pv'] = 1;

        //增加pv
        collection.findAndModify({   
            "name": name,
            "time.day": day,
            "postmark": postmark 
        }, [["time", -1]], {$inc: query}, {new: true}, findCallback);
    }

    function findCallback(err, doc) {
        mongodb.close();
        if (err) return callback(err, null);

        //解析markdown为html
        if (doc && flag) {
            doc.post = markdown.toHTML(doc.post);
            if (doc.comments) doc.comments.forEach(docCallback);
        }
        callback(null, doc);   //返回特定的查询文章
    }

    function docCallback(comment) {
        comment.content = markdown.toHTML(comment.content); 
    }

    if (!mongodb.openCalled)
        mongodb.open(openCallback);
    else
        mongodb.collection('posts', getPost);
};

Post.getArchive = function (name, callback) {
	
    function openCallback(err, db) {
        if (err) return callback(err);
        db.collection('posts', getPosts);
    }

    function getPosts(err, collection) {
        if (err) {
            mongodb.close();
            return callback(err);
        }

        collection
            .find({"name": name})
            .sort({time: -1})
            .toArray(getCallback);
    }

    function getCallback(err, docs) {
        mongodb.close();
        if (err) return callback(err);
        callback(null, docs);
    }

    if (!mongodb.openCalled)
        mongodb.open(openCallback);
    else
        mongodb.collection('posts', getPosts);
};

//按用户名获取标用户签集
Post.getTags = function (name, callback) {     

    function openCallback(err, db) {
        if (err) return callback(err);
        db.collection('posts', getPosts);
    }

    function getPosts(err, collection) {
        if (err) {
            mongodb.close();
            return callback(err);
        }

        var query = {};
        if (name) query.name = name;

        collection.distinct("tags", query, getCallback);
    }

    function getCallback(err, tags) {
        mongodb.close();
        if (err) return callback(err, null);
        callback(null, tags);
    }

    if (!mongodb.openCalled)
        mongodb.open(openCallback);
    else
        mongodb.collection('posts', getPosts);
};

//通过用户和标签名获取标签页
Post.getTagPage = function (name, tagname, callback) {  
	
    function openCallback(err, db) {
        if (err) return callback(err);
        db.collection('posts', getPosts);
    }

    function getPosts(err, collection) {
        if (err) {
            mongodb.close();
            return callback(err);
        }

        var query = {tags: tagname};
        if (name) query.name = name;

        collection
            .find(query)
            .sort({time: -1})
            .toArray(getCallback);
    }

    function getCallback(err, docs) {
        mongodb.close();
        if (err) return callback(err, null);
        callback(null, docs);
    }

    if (!mongodb.openCalled)
        mongodb.open(openCallback);
    else
        mongodb.collection('posts', getPosts);
};

Post.search = function (keyword, callback) {
	
    function openCallback(err, db) {
        if (err) return callback(err);
        db.collection('posts', getPosts);
    }

    function getPosts(err, collection) {
        if (err) {
            mongodb.close();
            return callback(err);
        }

        var query = {};
        var pattern = new RegExp("^.*" + keyword + ".*$", "i"); //关键词模式匹配

        if (keyword)
           query = {
                '$or': [
                    {'title': pattern},
                    {'tags': pattern},
                    {'time.day': pattern},
                    {'name': pattern}
                ]
            };

        collection
            .find(query)
            .sort({time: -1})
            .toArray(getCallback);
    }

    function getCallback(err, docs) {
        mongodb.close();
        if (err) return callback(err, null);
        callback(null, docs);
    }

    if (!mongodb.openCalled)
        mongodb.open(openCallback);
    else
        mongodb.collection('posts', getPosts);
};

Post.delete = function (post, callback) {
	
    function openCallback(err, db) {
        if (err) return callback(err);
        db.collection('posts', getCollection);
    }

    function getCollection(err, collection) {
        if (err) {
            mongodb.close();
            return callback(err);
        }

        var query = {};
        if (post) query = post;

        collection.remove(query, rmCallback);
    }

    function rmCallback(err) {
        mongodb.close();
        if (err) return callback (err);
        callback(null);
    }

    if (!mongodb.openCalled)
        mongodb.open(openCallback);
    else
        mongodb.collection('posts', getCollection);
};

//修改一篇文章
Post.rewriteOne = function (oldpost, newpost, callback) {    
	
    function openCallback(err, db) {
        if (err) return callback(err);
        db.collection('posts', getCollection); 
    }

    function getCollection(err, collection) {
        if (err) {
            mongodb.close();
            return callback(err);
        }
        
        collection.update(oldpost, {$set: newpost}, updateCallback);
    }

    function updateCallback(err) {
        mongodb.close();
        if (err) return callback(err);
        callback (null);
    }

    if (!mongodb.openCalled)
        mongodb.open(openCallback);
    else
        mongodb.collection('posts', getCollection);
};