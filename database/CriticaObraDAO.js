var pool;		// Pool de conexiones a la Base de Datos
var callback; 	// Función a la que se llamará para devolver el resultado de las consultas

function CriticaObraDAO(callbackFunction) {
	callback = callbackFunction;
	pool = require("./ConnectionPool.js");
}

/**
 * Devuelve las críticas de la obra cuyo id coincide con obraID ordenadas según
 * el criiterio orderBy.
 * 	obraID : ID de la obra
 *	orderBy : Criterio de ordenación del resultado
 */
CriticaObraDAO.prototype.findCriticasByObra = function(obraID, orderBy) {
	pool.getConnection(function(err,conn) {
		if (err) throw err;
		conn.query("select cr.*, us.nombre_usuario from critica cr, Usuario us where cr.obraID = ?" +
		" AND us.usuarioID = cr.usuarioID", obraID, function(err, rows) {

			if (err) {
				callback(err, null);
			}
			else {
				callback(null, rows);
			}
		});
		conn.release();
	});
}

module.exports = CriticaObraDAO;
