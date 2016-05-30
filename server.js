var express = require("express");
	bodyParser = require("body-parser");
	app = express();
	ObraDAO = require("./database/ObraDAO.js");
	UsuarioDAO = require("./database/UsuarioDAO.js");
	UsuarioCriticaObraDAO = require("./database/UsuarioCriticaObraDAO.js");
	UsuarioCriticaDAO = require("./database/UsuarioCriticaDAO.js");
	UsuarioEstadoObraDAO = require("./database/UsuarioEstadoObraDAO.js");
	CriticaObraDAO = require("./database/CriticaObraDAO.js");
	ComentarioDAO = require("./database/ComentarioDAO.js");

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

var workRouter = require("./routes/workApi.js")(app);
var userRouter = require("./routes/userApi.js")(app);
var commentRouter = require("./routes/commentApi.js")(app);
var reviewRouter = require("./routes/reviewApi.js")(app);

app.listen(8000, function() {
	console.log("Server running on port 8000");
});
