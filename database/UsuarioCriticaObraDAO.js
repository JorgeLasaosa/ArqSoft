var pool;		// Pool de conexiones a la Base de Datos
var callback; 	// Función a la que se llamará para devolver el resultado de las consultas

function UsuarioCriticaObraDAO(callbackFunction) {
	callback = callbackFunction;
	pool = require("./ConnectionPool.js");
}

/**
 * Devuelve la lista de críticas de un usuario.
 *	usuarioID : ID del usuario del que se quieren obtener las críticas. 
 */
UsuarioCriticaObraDAO.prototype.findCriticasByUsuario = function(usuarioID) {
	pool.getConnection(function(err, conn){
		conn.query("select * from Critica where usuarioID = ? order by fecha desc", usuarioID, function(err, rows) {
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

/**
 * Inserta una crítica.
 *	usuarioID : ID del usuario que realiza la crítica.
 *	obraID : ID de la obra que se critica.
 *	texto : Texto de la crítica.
 *	puntuacion : Puntuación de la crítica.		 
 */
UsuarioCriticaObraDAO.prototype.insertCritica = function(usuarioID, obraID, texto, puntuacion) {
	pool.getConnection(function(err, conn) {
		var insert = {usuarioID : usuarioID, obraID : obraID, texto : texto, puntuacion : puntuacion};
		conn.query("insert into Critica set ?", insert, function(err, rows) {
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

module.exports = UsuarioCriticaObraDAO;