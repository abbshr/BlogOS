

var dbConfig = require('../config.js').dbConfig,
	Db = require('mongodb').Db,
	Connection = require('mongodb').Connection,
	Server = require('mongodb').Server;
    
module.exports = new Db(dbConfig.db, new Server(dbConfig.host, dbConfig.port, {}), {safe:true}); 