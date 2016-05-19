var workRouter = function(app) {

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

  /* Establece el estado de una pelicula */
  app.put("/setWorkAs", function(req, res) {
  	//TODO
  	res.end();
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
}

module.exports = workRouter;
