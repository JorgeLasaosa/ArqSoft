var reviewRouter = function(app) {

/* Si existe la critica pone la nueva puntuacion,
sino existe crea la critica, la crea y pone la nueva puntacion.
Devuelve la nueva critica */
app.post("/api/writeReview", function(req, res) {
	var usuarioCriticaObraDAO = new UsuarioCriticaObraDAO(function(err, rows){
		if(err){
			console.log(err);
			res.end();
		}
		else {
			res.end(JSON.stringify(rows));
		}
	});
	usuarioCriticaObraDAO.insertCritica(req.body.userID, req.body.workID, req.body.textReview, req.body.punctuation);

});

/* Crea la review escrita, si ya existe, la modifica.
Devuelve la nueva critica*/
app.put("/api/punctuateWork", function(req,res) {
	var usuarioCriticaObraDAO = new UsuarioCriticaObraDAO(function(err, rows){
		if(err){
			console.log(err);
			res.end();
		}
		else {
			res.end(JSON.stringify(rows));
		}
	});
	usuarioCriticaObraDAO.updatePuntuacion(req.body.userID, req.body.workID, req.body.punctuation);
});

/* Devuelve las reviews de una obra */
app.get("/api/workReviews/:idWork", function(req, res) {
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

/* Devuelve las reviews de un usuario */
app.get("/api/userReviews/:idUser", function(req, res) {
	var usuarioCriticaObraDAO = new UsuarioCriticaObraDAO(function(err, rows) {
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			res.end(JSON.stringify(rows));
		}
	});
	usuarioCriticaObraDAO.findCriticasByUsuario(req.params.idUser);
});

/* Devuelve la review del idUsuario en la pelicula idWork*/
app.get("/api/review/:idWork/:idUser", function(req, res){
	var usuarioCriticaObraDAO = new UsuarioCriticaObraDAO(function(err, rows) {
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			res.end(JSON.stringify(rows));
		}
	});
	usuarioCriticaObraDAO.findCriticasByObraUsuario(req.params.idWork, req.params.idUser);
});

/* Modifica o inserta un voto de una critica */
app.put("/api/voteReview/", function(req, res){
	var usuarioCriticaDAO = new UsuarioCriticaDAO(function(err, rows) {
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			res.end(JSON.stringify(rows));
		}
	});
	usuarioCriticaDAO.insertVotoCritica(req.body.userID, req.body.reviewID, req.body.vote);
});



}
module.exports = reviewRouter;
