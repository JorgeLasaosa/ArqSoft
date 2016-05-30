var workRouter = function(app) {
  /* devuelve la informacion de una obra */
  app.get("/api/work/:idWork", function(req, res){
  	var obraDAO = new ObraDAO(function(err, rows){
  		if (err) {
  			console.log(err);
  			res.end();
  		}
  		else {
  			//console.log(rows);
  			res.end(JSON.stringify(rows));
  		}
  	});
  	obraDAO.findObra(req.params.idWork);
  });

  /* devuelve la lista de obras que coincidan con los parametros */
  app.get("/api/search/:search_field/:search_text", function(req, res) {
  	var obraDAO = new ObraDAO(function(err, rows) {
          if (err) {
             console.log(err);
          }
          else {
          	//console.log(rows);
          	res.end(JSON.stringify(rows));
          }
      });
      var field = req.params.search_field;
      if (field == "author") {
      	obraDAO.findObrasByAutor(req.params.search_text, field);
      }
      else if (field == "genre") {
      	obraDAO.findObrasByGenero(req.params.search_text, field);
      }
      else if (field == "cast") {
      	obraDAO.findObrasByPersonaje(req.params.search_text, field);
      }
      else {
      	obraDAO.findObrasByTitulo(req.params.search_text, field);
      }
  });

  /* devuelve las obras con estado de un usuario */
  app.get("/api/userWorks/:userID/:state", function(req, res){
  	var usuarioEstadoObraDAO = new UsuarioEstadoObraDAO(function(err, rows) {
  		if (err) {
  			console.log(err);
  			res.end();
  		}
  		else {
  			res.end(JSON.stringify(rows));
  		}
  	});
  	var state = req.params.state;
  	if (state == 'watched') {
  		usuarioEstadoObraDAO.findObrasByEstado(req.params.userID, 'vista');
  	}
  	else if (state == "watching") {
  		usuarioEstadoObraDAO.findObrasByEstado(req.params.userID, 'viendo');
  	}
  	else {
  		usuarioEstadoObraDAO.findObrasByEstado(req.params.userID, 'pendiente');
  	}
  });

  /* Devuelve una lista de las obras mejores puntuadas */
  app.get("/api/mostRated", function(req, res){
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

  /* Devuelve una lista de las obras con mas criticas */
  app.get("/api/mostReviewed", function(req, res){
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

  /* Establece el estado de una pelicula */
  app.put("/api/setStateWork/", function(req, res) {
    var usuarioEstadoObraDAO = new UsuarioEstadoObraDAO(function(err, rows){
      if (err) {
        console.log(err);
        res.end();
      }
      else {
        //console.log(rows);
        res.end(JSON.stringify(rows));
      }
    });
    usuarioEstadoObraDAO.updateEstado(req.body.userID, req.body.workID, req.body.state);
    res.end();
  });

  /* Devuelve el estado de un usuario sobre una pelicula */
  app.get("/api/state/:userID/:workID", function(req, res){
  	var usuarioEstadoObraDAO = new UsuarioEstadoObraDAO(function(err, rows) {
  		if (err) {
  			console.log(err);
  			res.end();
  		}
  		else {
  			res.end(JSON.stringify(rows));
  		}
  	});
  	usuarioEstadoObraDAO.findEstadoByObraUsuario(req.params.userID, req.params.workID);
  });
}

module.exports = workRouter;
