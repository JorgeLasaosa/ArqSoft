var userRouter = function(app) {
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
  	console.log("Soulmates ID user: " + req.body.usuarioID);
  	usuarioCriticaObraDAO.findAlmasGemelas(req.body.usuarioID);
  });

}

module.exports = userRouter;
