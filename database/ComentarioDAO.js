var pool;		// Pool de conexiones a la Base de Datos
var callback; 	// Función a la que se llamará para devolver el resultado de las consultas

function ComentarioDAO(callbackFunction) {
	callback = callbackFunction;
	pool = require("./ConnectionPool.js");
}

/**
 * Inserta el comentario en la Base de Datos.
 * 	usuarioID : ID del usuario que comenta.
 *	criticaID : ID de la crítica en la que se comenta.
 *	texto : Texto del comentario.
 */
ComentarioDAO.prototype.insertComentario = function(usuarioID, criticaID, texto) {
	pool.getConnection(function(err,conn) {
		if (err) throw err;
		var insert = {usuarioID : usuarioID, criticaID : criticaID, texto : texto, fecha : new Date()};
		conn.query("insert into comentar set ?", insert, function(err, rows) {
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
 * Devuelve la lista de comentarios del usuario.
 * 	usuarioID : ID del usuario del que se quiere obtener los comentarios.
 */
ComentarioDAO.prototype.findComentariosByUsuario = function(usuarioID) {
	pool.getConnection(function(err,conn) {
		if (err) throw err;
		conn.query("select co.*, us.nombre_usuario from Comentar co, Usuario us "+
		"where co.usuarioID = ? AND co.usuarioID = us.usuarioID order by co.fecha desc", usuarioID, function(err, rows) {
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
 * Devuelve la lista de comentarios a la crítica.
 * 	criticaID : ID de la crítica de la que se quieren obtener los comentarios.
 */
ComentarioDAO.prototype.findComentariosByCritica = function(criticaID) {
	pool.getConnection(function(err,conn) {
		if (err) throw err;
		conn.query("select co.*, us.nombre_usuario from Comentar co, Usuario us " +
		"where co.criticaID = ? AND co.usuarioID = us.usuarioID order by co.fecha desc", criticaID, function(err, rows) {
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

module.exports = ComentarioDAO;
