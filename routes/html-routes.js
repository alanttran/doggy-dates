// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user does not have an account send them to the members sign-up page
    if (req.user) {
      res.redirect("/members");
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
      res.redirect("/members");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/new-profile-form", function(req, res){
    console.log('new profile route');
    res.render('new_profile_form');
  });

  app.get("/profile", function(req, res){
    res.render('profile');
  });

  app.get("/matches", function(req, res){
    res.render('matches');
  });

  app.get("/pet-pref", function(req, res){
    res.render('pet_pref');
  });

  app.get("/profile-form-submit", function(req, res){
    res.render('profile_form');
  });

};
