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
		if (err) throw err;
		conn.query("select cr.criticaID, cr.usuarioID, cr.obraID, cr.puntuacion, cr.texto, cr.fecha, cr.votos_positivos, cr.votos_totales, ob.titulo"
			+ " from critica cr, obra ob where usuarioID = ? and cr.obraID = ob.obraID;", usuarioID, function(err, rows) {
			conn.release();
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

/**
 * Inserta una crítica.
 *	usuarioID : ID del usuario que realiza la crítica.
 *	obraID : ID de la obra que se critica.
 *	texto : Texto de la crítica.
 *	puntuacion : Puntuación de la crítica.		 
 */
UsuarioCriticaObraDAO.prototype.insertCritica = function(usuarioID, obraID, texto, puntuacion) {
	pool.getConnection(function(err, conn) {
		if (err) throw err;
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
		conn.release();
	});
}

module.exports = UsuarioCriticaObraDAO;