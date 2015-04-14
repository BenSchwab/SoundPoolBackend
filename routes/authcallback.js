
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var request = require('request');

var User = mongoose.model('User');
var UserController = require('../controllers/Users');
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional



router.get('/', function(req, res) {
  var stateKey = 'spotify_auth_state';
  var client_id = '1adddf5d5b1c4e638dbcc6ea8f2c7503'; // Your client id
  var client_secret = '3a48222e35d04373b191bdd77344fb0c'; // Your client secret
  var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

  process.stdout.write("In callback route");

  var spotifyApi = new SpotifyWebApi({
  clientId : client_id,
  clientSecret : client_secret,
  redirectUri : redirect_uri
});

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  console.log(req.cookies);

  console.log("State:" +state);
  console.log("Stored state: "+storedState);

    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

            token = access_token;
            spotifyApi.setAccessToken(token);

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log("In the new auth handles");
          console.log("Set cookie session : "+body.id);
          req.session.userId = body.id;

          //Get the user from the id
          UserController.get(body.id, function(err, user){
              if(!user){
                //create the user if necessary
                  UserController.create({'id':body.id,'display_name':body.display_name, 'accessToken':access_token},function(err,user){
                    if(err) return console.error(err);
                    console.log("saved new user")
                  });
              }
              else{
                console.log("Found user!: "+user.id);
              }

              res.redirect('/profiles')
              console.log(user);
           });

        });
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  //}
});



module.exports = router;