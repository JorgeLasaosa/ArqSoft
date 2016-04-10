var express = require("express");
	bodyParser = require("body-parser");
	app = express();

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.post('/search', function(req, res) {
	console.log(req.body.search_text);
	var hots =
	   [
	      {
	         "title": "Heroes of the Storm",
	         "directors":
	         [
	            {"name": "Jorge Lasaosa Salinas"}
	         ],
	         "casts":
	         [
	            {"name": "The Lost Vikings"},
	            {"name": "Li-Ming"},
	            {"name": "Kharazim"}
	         ]
	      },
	      {
	         "title": "Violadores del Verso",
	         "start_year": 2002,
	         "end_year": 2007,
	         "directors":
	         [
	            {"name": "BOA TV"},
	            {"name": "RAP SOLO"}
	         ],
	         "casts":
	         [
	            {"name": "Kase.O"},
	            {"name": "Sho-Hai"},
	            {"name": "Lírico"},
	            {"name": "R de Rumba"}
	         ],
	         "categories":
	         [
	            {"name": "anime"}
	         ]
	      }
	  	]
	res.send(hots);
});

app.listen(8000, function() {
	console.log("Server running on port 8000");
});