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
		var insert = {usuarioID : usuarioID, obraID : obraID, estado : estado};
		conn.query("insert into Establecer set ?" + query, function(err, rows) {
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

module.exports = UsuarioEstadoObraDAO;