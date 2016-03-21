var express = require("express");
	app = express();

app.use(express.static(__dirname));

app.listen(8000, function() {
	console.log("Server running on port 8000");
});