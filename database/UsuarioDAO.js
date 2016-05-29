var pool;		// Pool de conexiones a la Base de Datos
var callback; 	// Función a la que se llamará para devolver el resultado de las consultas

function UsuarioDAO(callbackFunction) {
	callback = callbackFunction;
	pool = require("./ConnectionPool.js");
}

/**
 * Inserta un nuevo usuario.
 *	username : Nombre de cuenta del usuario.
 *	password : Contraseña de la cuenta del usuario.
 *	nombre : Nombre real del usuario.
 * 	apellidos : Apellidos del usuario.
 * 	email : E-mail del usuario.
 * 	imagen : Imagen de perfil del usuario.
 */
UsuarioDAO.prototype.insertUsuario = function(username, password, nombre, apellidos, email, imagen) {
	pool.getConnection(function(err, conn){
		if (err) throw err;
		var insert = {nombre_usuario : username, contraseña : password, nombre : nombre, apellidos : apellidos,
			          correo_electronico : email};
		if (imagen != null) {
			insert.imagen = imagen;
		}
		conn.query("insert into Usuario set ?", insert, function(err, rows) {
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
 * Devuelve el usuario que coincide con los datos de identificación. Si los datos son incorrectos
 * devuelve una lista vacía.
 *	username : Nombre de cuenta del usuario.
 *	password : Contraseña de la cuenta del usuario.
 */
UsuarioDAO.prototype.findUsuario = function(username, password) {
	pool.getConnection(function(err, conn) {
		if (err) throw err;
		conn.query("select * from Usuario where nombre_usuario = ? AND contraseña = ?", [username, password] , function(err, rows) {
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

/* Devuelve el usuario cuyo id coincide */
UsuarioDAO.prototype.findUsuarioPublico = function(id) {
	pool.getConnection(function(err, conn) {
		if (err) throw err;
		conn.query("select usuarioID, nombre_usuario, nombre, apellidos, correo_electronico, imagen from Usuario where usuarioID = ?", id , function(err, rows) {
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
 * Actualiza los datos de un usuario.
 *	usuarioID : ID del usuario a actualizar.
 *	new_username : Nuevo nombre de cuenta del usuario.
 *	new_password : Nueva contraseña del usuario.
 * 	new_nombre	: Nuevo nombre del usuario.
 *	new_apellidos : Nuevos apellidos del usuario.
 * 	new_email : Nuevo e-mail del usuario.
 *	new_imagen : Nueva imagen de perfil del usuario.
 */
UsuarioDAO.prototype.updateUsuario = function(usuarioID, new_username, new_password, new_nombre, new_apellidos, new_email, new_imagen) {
	pool.getConnection(function(err,conn) {
		if (err) throw err;

		var newUsuario = {};
		if (new_username != null && new_username != "") {
			newUsuario.nombre_usuario = new_username;
		}
		if (new_password != null && new_password != "") {
			newUsuario.contraseña = new_password;
		}
		if (new_nombre != null && new_nombre != "") {
			newUsuario.nombre = new_nombre;
		}
		if (new_apellidos != null && new_apellidos != "") {
			newUsuario.apellidos = new_apellidos;
		}
		if (new_email != null && new_email != "") {
			newUsuario.correo_electronico = new_email;
		}
		if (new_imagen != null) {
			newUsuario.imagen = new_imagen;
		}
		conn.query("update Usuario set ? where usuarioID = ?", [newUsuario, usuarioID], function(err, rows) {
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
 * Elimina un usuario.
 *	usuarioID : ID del usuario a eliminar.
 */
UsuarioDAO.prototype.deleteUsuario = function(usuarioID) {
	pool.getConnection(function(err,conn) {
		if (err) throw err;
		conn.query("delete from Usuario where usuarioID = ?", usuarioID, function(err, rows) {
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
module.exports = UsuarioDAO;
