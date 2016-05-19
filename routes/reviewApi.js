var reviewRouter = function(app) {
/* Si existe la critica pone la nueva puntuacion,
sino existe crea la critica, la crea y pone la nueva puntacion.
Devuelve la nueva critica */
app.put("/writeReview", function(req, res) {
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
app.put("/punctuateWork", function(req,res) {
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
}
module.exports = reviewRouter;
