// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");
const yelp = require('yelp-fusion');

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/results", function(req, res) {
	const clientId = 'iMwvylbqrydUu45E4CD0Hg';
	const clientSecret = 'IzZ1gqChie6JtsJKt6qjzEfj2eCesJlEPzUIUcj5nU1FRxjAvDJLXvIOnGyfvgjC';

	let searchTerm = "dog parks";
	let searchLoc = "san diego, ca"

	const searchRequest = {
	  term: searchTerm,
	  location: searchLoc
	};

	yelp.accessToken(clientId, clientSecret).then(response => {
	  const client = yelp.client(response.jsonBody.access_token);

	  client.search(searchRequest).then(response => {
		const firstResult = response.jsonBody.businesses[0];
		const prettyJson = JSON.stringify(firstResult, null, 4);    

		let parksObj = {
			parks: response.jsonBody.businesses //data is a array of objects
		};

		console.log("RESULTS JSON", response.jsonBody.businesses);
		res.render("yelp_results", parksObj);
	  	
	  });
	});


  });

};
