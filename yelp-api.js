'use strict';

const yelp = require('yelp-fusion');

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
    console.log(prettyJson);

    console.log("RESPONSE", response.jsonBody.businesses);

    let parksObj = {
      parks: prettyJson //data is a array of objects
    };

    res.render("yelp_results", parksObj);
  });
}).catch(e => {
  console.log(e);
});
