var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'arqsoft'
});

exports.getConnection = function(callback) {
	pool.getConnection(function(err,conn){
		callback(err,conn);
	});
};
