var pool;		// Pool de conexiones a la Base de Datos
var callback; 	// Función a la que se llamará para devolver el resultado de las consultas

function CriticaObraDAO(callbackFunction) {
	callback = callbackFunction;
	pool = require("./ConnectionPool.js");
}

/**
 * Devuelve las críticas de la obra cuyo id coincide con obraID ordenadas según
 * el criiterio orderBy.
 */
CriticaObraDAO.prototype.findCriticasByObra = function(obraID, orderBy) {
	pool.getConnection(function(err,conn) {
		conn.query("select * from critica where obraID = ?", obraID, function(err, rows) {
			conn.release();
			if (err) {
				callback(err, null);
			}
			else {
				callback(null, rows);
			}
		});
	});
}

module.exports = CriticaObraDAO;