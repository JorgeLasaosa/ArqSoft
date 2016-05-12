var pool;		// Pool de conexiones a la Base de Datos
var callback; 	// Función a la que se llamará para devolver el resultado de las consultas

function UsuarioEstadoObraDAO(callbackFunction) {
	callback = callbackFunction;
	pool = require("./ConnectionPool.js");
}

/**
 * Inserta el estado de un usuario respecto a una obra.
 *	usuarioID : ID del usuario que establece estado a una obra.
 *	obraID : ID de la obra a la que se le establece el estado.
 *	estado : Estado a establecer ({vista, viendo, pendiente})		 
 */
UsuarioEstadoObraDAO.prototype.insertEstado = function(usuarioID, obraID, estado) {
	pool.getConnection(function(err, conn){
		if (err) throw err;
		var insert = {usuarioID : usuarioID, obraID : obraID, estado : estado};
		conn.query("insert into Establecer set ?" + query, function(err, rows) {
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
 * Devuelve la lista de obras que el usuario ha marcado con un cierto estado.
 * 	usuarioID : ID del usuario del que se quiere obtener las obras marcadas.
 *	estado : Estado que se quiere buscar en las obras.	 
 */
UsuarioEstadoObraDAO.prototype.findObrasByEstado = function(usuarioID, estado) {
	pool.getConnection(function(err, conn){
		if(err) throw err;
		conn.query("select * from Obra ob, Establecer es where ob.obraID = es.obraID and es.usuarioID = ? and es.estado = ?", [usuarioID, estado],function(err, rows) {
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

module.exports = UsuarioEstadoObraDAO;