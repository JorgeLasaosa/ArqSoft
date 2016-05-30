var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : '85.251.93.32'/*'85.251.93.32'*/,
    user     : 'jorge',
    password : 'jorge',
    database : 'arqsoft',
    multipleStatements: true
});

exports.getConnection = function(callback) {
	pool.getConnection(function(err,conn){
		callback(err,conn);
	});
};
