var db = require("../models");
const yelp = require('yelp-fusion');
var passport = require("../config/passport");
let cookie = require("cookie");
var cookieParser = require('cookie-parser');

module.exports = function(app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/signin", passport.authenticate("local", {
        successRedirect: "/profile",
        failureRedirect: "/signup"
    }), function(req, res) {
      
    });


    app.get("/profile", function(req, res) {

        console.log('Profile req', req);

        db.User.findById(1).then(data => {

            let userObj = {
                user: data //data is a array of objects
            };
            res.render('profile', userObj);

        }) 

        // if (!req.user) {
        //     //The user is not logged in, send to login page
        //     res.json({});
        // } else {
        //     //The user is logged in, show his account information
        //     res.json({
        //         email: req.user.email,
        //         id: req.user.id
        //     });
        // }
    });

    app.post("/profile-form-submit", function(req, res){
        db.Dogs.create(req.body).then(function(data) {
          res.redirect("/matches");
        });
    });


    app.get("/preferences", function(req, res){
        db.Dogs.findById(3).then(data => {

            // console.log(data.dob);
            // let dob = data.dob

            let dogObj = {
                dog: data //data is a array of objects
            };

            res.render('profile_preferences', dogObj);  
        });

     });


    app.get("/api/dog_data", function(req, res) {
        db.Dogs.findById(1).then(data => {

            // console.log(data.dob);

            // let dob = data.dob

            // let dogObj = {
            //     dog: data //data is a array of objects
            // };

            res.json({
                data: data
            });   
        });   

    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/", function(req, res) {

        req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
        req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
        req.checkBody('password', 'Password field cannot be empty.').notEmpty();
        req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
        req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");

        var errors = req.validationErrors();

        if (errors) {

            console.log("\nerrors: " + JSON.stringify(errors) + "\n");
            res.render("signup", { errorArray: errors });

        } else {
            db.User.create({
                email: req.body.email,
                password: req.body.password
            }).then(function(user) {
                    passport.authenticate("local")(req, res, function(){
                        console.log("user logged in");
                        console.log('Session ID is', req.user.dataValues.id); 
                        // console.log('Cookies: ', req.cookies); 
                        res.redirect("/new-profile");
                        

                    })
            
                
               
            });
        };
        
    });

    app.get("/yelp-results", function(req, res) {
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
                res.render("yelp", parksObj);

            });
        });

    });

    app.post("/yelp-results", function(req, res) {

        let zip = req.body.zip_code;

        console.log(zip);

        const clientId = 'iMwvylbqrydUu45E4CD0Hg';
        const clientSecret = 'IzZ1gqChie6JtsJKt6qjzEfj2eCesJlEPzUIUcj5nU1FRxjAvDJLXvIOnGyfvgjC';

        let searchTerm = "dog parks";
        let searchLoc = zip;

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

                res.render("yelp", parksObj);

            });
        });
    });


    app.get("/api/yelp-results", function(req, res) {
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

                res.render("profile_matches", parksObj);

            });
        });

    });

    // Route for logging user out
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {

            // Set a cookie on login
            res.setHeader('Set-Cookie', cookie.serialize('id', req.user.id, {
              httpOnly: true,
              maxAge: 60 * 60 * 24 * 7 // 1 week 
            }));

            // Parse the cookies on the request 
            var cookies = cookie.parse(req.headers.cookie || '');

            // Get the user id set in the cookie 
            var userCookie = cookies.id;
            console.log(userCookie);

            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
            
        }
    });

    app.get("/matches", function(req, res){

        // Pass in user data for sidebar
        db.Dogs.findById(1).then(data => {

            dogObj = {
                dog: data //data is a array of objects
            };

        })       

        db.Dogs.findAll().then(data => {

            let allDogsObj = {
                all_dogs: data //data is a array of objects
            };
            
            res.render('profile_matches', allDogsObj);
        })
      
    });

    app.post("/matches-submit", function(req, res){
        console.log(req.body);
    });

    app.get("/matches", function(req, res){
        db.Dogs.findAll().then(data => {

        let allDogsObj = {
            all_dogs: data //data is a array of objects
        };
          res.render('profile_matches', allDogsObj);
        })     
    });
    

    // Redirect the user to Facebook for authentication.  When complete,
    // Facebook will redirect the user back to the application at
    //     /auth/facebook/callback
    app.get(
        '/auth/facebook',
        passport.authenticate('facebook', { scope: ['email'] })
    );

    // Facebook will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    app.get(
        '/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/' }),
        function(req, res) {

            console.log('fb callback in api routes, new user?', req);
            db.Facebook.findAll({}).then(function(user) {
                  if(user) {
                      res.render('new_profile_form');
                  } else {
                    res.render('profile');
                  } 
                })
            // if (req.user._options.isNewRecord) {
            //     // send to form to fill out for new pets
            //     res.render('new_profile_form');
            // } else {
            //     // send to their list of pets?
            //     res.render('profile');
            // }
            
        }
    );

};