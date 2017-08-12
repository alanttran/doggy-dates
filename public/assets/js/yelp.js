'use strict';
$(document).ready(function(){
		$.get( "api/yelp-results", function( data ) {
		  console.log(data);
		});
});

