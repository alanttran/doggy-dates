// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var cookieParser = require('cookie-parser')

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user does not have an account send them to the members sign-up page
    if (req.user) {
      res.redirect("/new-profile");
    }
    res.render("signup");
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    res.redirect("/");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members login page
    if (req.user) {
      res.redirect("/profile");
    }
    res.render("login");
  });

  app.get("/new-profile", function(req, res){
     console.log('Cookies: ', req.cookies); 
    res.render('new_profile_form');
  });

  app.get("/profile-form-submit", function(req, res){
    res.render('profile_form');
  });

};
