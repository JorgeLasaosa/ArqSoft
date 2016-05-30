var pool;		// Pool de conexiones a la Base de Datos
var callback; 	// Función a la que se llamará para devolver el resultado de las consultas

function UsuarioCriticaDAO(callbackFunction) {
	callback = callbackFunction;
	pool = require("./ConnectionPool.js");
}

/**
 * Votar una crtítica.
 *	usuarioID : ID del usuario que vota.
 *	criticaID : ID de la crítica que se vota.
 *	voto : Voto asignado ({-1, 0, 1}).
 */
UsuarioCriticaDAO.prototype.insertVotoCritica = function(usuarioID, criticaID, voto) {
	pool.getConnection(function(err, conn){
		var auxVoto;
		var query = {usuarioID : usuarioID, criticaID : criticaID, voto : voto};
		conn.query("replace into votar set ?",query, function(err, rows) {
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

module.exports = UsuarioCriticaDAO;
