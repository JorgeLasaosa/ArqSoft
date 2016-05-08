var express = require("express");
	bodyParser = require("body-parser");
	app = express();
	ObraDAO = require("./database/ObraDAO.js");
	UsuarioDAO = require("./database/UsuarioDAO.js");
	UsuarioCriticaObraDAO = require("./database/UsuarioCriticaObraDAO.js");
	UsuarioEstadoObraDAO = require("./database/UsuarioEstadoObraDAO.js");
	CriticaObraDAO = require("./database/CriticaObraDAO.js");

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.post("/search", function(req, res) {
	var obraDAO = new ObraDAO(function(err, rows) {
        if (err) {
           console.log(err);
        }
        else {
        	//console.log(rows);
        	res.end(JSON.stringify(rows));
        }
    });
    var field = req.body.search_field;
    if (field == "author") {
    	obraDAO.findObrasByAutor(req.body.search_text, field);
    }
    else if (field == "genre") {
    	obraDAO.findObrasByGenero(req.body.search_text, field);
    }
    else if (field == "cast") {
    	obraDAO.findObrasByPersonaje(req.body.search_text, field);
    }
    else {
    	obraDAO.findObrasByTitulo(req.body.search_text, field);
    }
});

app.post("/register", function(req, res) {
	var usuarioDAO = new UsuarioDAO(function(err, rows) {
		if (err) {
			console.log(err);
		}
		else {
			console.log("User added");
		}
		res.end();
	});
	usuarioDAO.insertUsuario(req.body.username, req.body.password, req.body.nombre, req.body.apellidos, req.body.email, null);
});

app.post("/login", function(req,res) {
	var usuarioDAO = new UsuarioDAO(function(err, rows) {
		if (err) {
			console.log(err);
		}
		else {
			if (rows.length == 0) {
				console.log("Usuario no registrado");
				res.end();
			}
			else {
				console.log("User logged in");
				res.end(JSON.stringify(rows[0]));
			}
		}
	});
	usuarioDAO.findUsuario(req.body.username, req.body.password);
});

app.post("/update", function(req, res) {
	var usuarioDAO = new UsuarioDAO(function(err, rows) {
		if (err) {
			console.log(err);
		}
		else {
			console.log("User updated");
		}
		res.end();
	});
	usuarioDAO.updateUsuario(
		req.body.user.usuarioID, /* ID usuario a actualizar */
		req.body.user.username, /* Username */
		req.body.formData.password, /* Nueva Contraseña */
		req.body.formData.nombre, 	/* Nuevo Nombre */
		req.body.formData.apellidos,/* Nuevos apellidos */
		req.body.formData.email,	/* Nuevo E-mail */
		req.body.formData.imagen	/* Nueva imagen */
	);
});

app.post("/delete", function(req, res) {
	var usuarioDAO = new UsuarioDAO(function(err, rows) {
		if (err) {
			console.log(err);
		}
		else {
			console.log("User deleted");
		}
		res.end();
	});
	usuarioDAO.deleteUsuario(req.body.user.usuarioID);
});

app.post("/userReviews", function(req, res) {
	var usuarioCriticaObraDAO = new UsuarioCriticaObraDAO(function(err, rows) {
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			res.end(JSON.stringify(rows));
		}
	});
	usuarioCriticaObraDAO.findCriticasByUsuario(req.body.usuarioID);
});

app.post("/mostRated", function(req, res){
	var obraDAO = new ObraDAO(function(err, rows) {
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			res.end(JSON.stringify(rows));
		}
	});
	obraDAO.findObrasMejorValoradas(10);
});

app.post("/mostReviewed", function(req, res){
	var obraDAO = new ObraDAO(function(err, rows) {
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			res.end(JSON.stringify(rows));
		}
	});
	obraDAO.findObrasMasCriticadas(10);
});

app.post("/userWorks", function(req, res){
	var usuarioEstadoObraDAO = new UsuarioEstadoObraDAO(function(err, rows) {
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			res.end(JSON.stringify(rows));
		}
	});
	var state = req.body.state;
	if (state == 'watched') {
		usuarioEstadoObraDAO.findObrasByEstado(req.body.usuarioID, 'vista');
	}
	else if (state == "watching") {
		usuarioEstadoObraDAO.findObrasByEstado(req.body.usuarioID, 'viendo');
	}
	else {
		usuarioEstadoObraDAO.findObrasByEstado(req.body.usuarioID, 'pendiente');
	}
});

app.post("/twinSouls", function(req, res) {
	var twins = '[{"usuarioID":87,"nombre_usuario":"zcvsjr07","contraseña":"password","nombre":"Brett Upton","apellidos":"Fuller","correo_electronico":"Duis.at.lacus@milacinia.net","imagen":null}]';
	res.end(twins);
});

app.post("/soulmates", function(req, res) {
	var usuarioCriticaObraDAO = new UsuarioCriticaObraDAO(function(err, rows) {
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			console.log(rows);
			res.end(JSON.stringify(rows));
		}
	});
	usuarioCriticaObraDAO.findAlmasGemelas(req.body.usuarioID);
});

app.get("/work/:idWork", function(req, res){
	var obraDAO = new ObraDAO(function(err, rows){
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			console.log(rows);
			res.end(JSON.stringify(rows));
		}
	});
	obraDAO.findObra(req.params.idWork);
});

app.get("/workReviews/:idWork", function(req, res) {
	var criticaObraDAO = new CriticaObraDAO(function(err, rows) {
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			console.log(rows);
			res.end(JSON.stringify(rows));
		}
	});
	criticaObraDAO.findCriticasByObra(req.params.idWork, "trash");
});

app.listen(8000, function() {
	console.log("Server running on port 8000");
});
