var commentRouter = function(app) {

    /* Devuelve una ista de commentarios de una critica de una obra*/
    app.get("/api/comment/:idReview", function(req, res){
    	var comentarioDAO = new ComentarioDAO(function(err, rows){
    		if (err) {
    			console.log(err);
    			res.end();
    		}
    		else {
    			//console.log(rows);
    			res.end(JSON.stringify(rows));
    		}
    	});
    	obraDAO.findComentariosByCritica(req.params.idReview);
    });

    /* comenta sobra una review */
    app.post("/api/comment/", function(req, res){
      var comentarioDAO = new ComentarioDAO(function(err, rows){
    		if (err) {
    			console.log(err);
    			res.end();
    		}
    		else {
    			//console.log(rows);
    			res.end(JSON.stringify(rows));
    		}
    	});
    	obraDAO.insertComentario(req.body.workID, req.body.reviewID, req.body.text);
    });
}
module.exports = commentRouter;
