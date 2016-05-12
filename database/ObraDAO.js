var pool;		// Pool de conexiones a la Base de Datos
var callback; 	// Función a la que se llamará para devolver el resultado de las consultas

function ObraDAO(callbackFunction) {
	callback = callbackFunction;
	pool = require("./ConnectionPool.js");
}

/**
 * Devuelve la lista de obras cuyo título cumple el criterio de búsqueda.
 *	search : Consulta de búsqueda de título de obra en lenguaje natural.
 *	orderBy : Criterio de ordenación del resultado.		 
 */
ObraDAO.prototype.findObrasByTitulo = function(search, orderBy) {
	pool.getConnection(function(err, conn){
		if (err) throw err;
		var query = "";
	 	if (search != null && search != "") {
		    var arr = search.split(" ");
		    query = " WHERE upper(titulo) like upper('%" + arr[0] + "%')";
		    var i = 1;
		    while (i < arr.length) {
		 		query += " OR upper(titulo) like upper('%" + arr[i] + "%')";
		 		i++;
		    }
		}
		conn.query("select * from obra" + query, function(err, rows) {
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
 * Devuelve la lista de obras en la que aparece un personaje cuyo nombre cumple el criterio de búsqueda.
 *	search : Consulta de búsqueda de nombre de personaje en lenguaje natural.
 *	orderBy : Criterio de ordenación del resultado.		 
 */
ObraDAO.prototype.findObrasByPersonaje = function(search, orderBy) {
	pool.getConnection(function(err, conn) {
		var query = "";
		if (search != null && search != "") {
		    var arr = search.split(" ");
		    query = " WHERE upper(p.nombre) like upper('%" + arr[0] + "%')";
		    var i = 1;
		    while (i < arr.length) {
		 		query += " OR upper(p.nombre) like upper('%" + arr[i] + "%')";
		 		i++;
		    }
		    query += " AND p.personajeID = ap.personajeID AND ob.obraID = ap.obraID";
		}
		conn.query("select * from obra ob, personaje p, aparecer ap" + query, function(err, rows) {
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
 * Devuelve la lista de obras que pertenecen a un género que cumple el criterio de búsqueda.
 *	search : Consulta de búsqueda de género en lenguaje natural.
 *	orderBy : Criterio de ordenación del resultado.		 
 */
ObraDAO.prototype.findObrasByGenero = function(search, orderBy) {
	pool.getConnection(function(err,conn) {
		var query = "";
		if (search != null && search != "") {
		    var arr = search.split(" ");
		    query = " WHERE upper(g.nombre) like upper('%" + arr[0] + "%')";
		    var i = 1;
		    while (i < arr.length) {
		 		query += " OR upper(g.nombre) like upper('%" + arr[i] + "%')";
		 		i++;
		    }
		    query += " AND g.generoID = t.generoID AND ob.obraID = t.obraID";
		}
		conn.query("select * from obra ob, genero g, tener t" + query, function(err, rows) {
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
 * Devuelve la lista de obras cuyo autor cumple el criterio de búsqueda.
 *	search : Consulta de búsqueda de nombre de autor en lenguaje natural.
 *	orderBy : Criterio de ordenación del resultado.		 
 */
ObraDAO.prototype.findObrasByAutor = function(search, orderBy) {
	pool.getConnection(function(err,conn) {
		var query = "";
		if (search != null && search != "") {
		    var arr = search.split(" ");
		    query = " WHERE upper(au.nombre) like upper('%" + arr[0] + "%')";
		    var i = 1;
		    while (i < arr.length) {
		 		query += " OR upper(au.nombre) like upper('%" + arr[i] + "%')";
		 		i++;
		    }
		    query += " AND au.autorID = cr.autorID AND ob.obraID = cr.obraID";
		}
		conn.query("select * from obra ob, autor au, crear cr" + query, function(err, rows) {
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
 * Devuelve la obra cuyo id es obraID.
 *	obraID : ID de la obra.
 */
ObraDAO.prototype.findObra = function(obraID) {
	pool.getConnection(function(err,conn) {
		if (err) throw err;
		conn.query("select * from obra where obraID = ?", [obraID], function(err, rows) {
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
 * Devuelve las num primeras obras ordenadas según su puntuación media en orden
 * descendente.
 *	num : Número de obras a devolver.
 */
ObraDAO.prototype.findObrasMejorValoradas = function(num) {
	pool.getConnection(function(err,conn) {
		if (err) throw err;
		conn.query("select * from obra order by (puntuacion_total/puntuaciones_recibidas) desc LIMIT ?", num, function(err, rows) {
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
 * Devuelve las num primeras obras ordenadas según su número de críticas en orden
 * descendente.
 *	num : Número de obras a devolver.
 */
ObraDAO.prototype.findObrasMasCriticadas = function(num) {
	pool.getConnection(function(err,conn) {
		if (err) throw err;
		conn.query("select * from obra order by (puntuaciones_recibidas) desc LIMIT ?", num, function(err, rows) {
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
module.exports = ObraDAO;