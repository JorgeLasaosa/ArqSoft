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
UsuarioCriticaDAO.prototype.votarCritica = function(usuarioID, criticaID, voto) {
	pool.getConnection(function(err, conn){
		var auxVoto;
		if (voto !== 1 && voto !== -1 ) {
			auxVoto = 0;
		}
		var insert = {usuarioID : usuarioID, criticaID : criticaID, voto : auxVoto};
		conn.query("insert into Votar set ?", function(err, rows) {
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