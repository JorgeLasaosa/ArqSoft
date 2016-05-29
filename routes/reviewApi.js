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
			res.end(JSON.stringify(rows)); //TODO no devuelve nada
		}
	});
	usuarioCriticaObraDAO.insertCritica(req.body.userID, req.body.workID, req.body.textReview, req.body.punctuation);

});

/* Crea la review escrita, si ya existe, la modifica.
Devuelve la nueva critica*/
app.put("/api/punctuateWork", function(req,res) {
	/*var usuarioCriticaObraDAO = new UsuarioCriticaObraDAO(function(err, rows){
		if(err){
			console.log(err);
			res.end();
		}
		else {
			res.end(); //TODO no devuelve nada
		}
	});
	usuarioCriticaObraDAO.insertPuntuacion(req.body.userID, req.body.workID, req.body.textReview, req.body.punctuation);
	*/
	res.end();
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
	usuarioCriticaObraDAO.findCriticasByUsuario(req.params.usuarioID);
});

/* Devuelve la review del idUsuario en la pelicula idWork*/
app.get("/api/review/:idWork/:idUser", function(req, res){
	//TODO
	var v = '{"criticaID":97,"usuarioID":92,"obraID":50,"puntuacion":5,"texto":"Este es un texto de prueba","fecha":"2016-12-11T20:46:14.000Z","votos_positivos":null,"votos_totales":null}';
	res.end(v);
});



}
module.exports = reviewRouter;
