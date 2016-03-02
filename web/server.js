var express = require("express");
	app = express();


var login = 'root';
	password = 'toor';

	mysqli = new mysqli(login, password);

app.use(express.static(__dirname));

app.listen(8000, function() {
	console.log("Server running on port 8000");
});