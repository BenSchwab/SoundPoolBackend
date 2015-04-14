//Application metadata
var client_id = '1adddf5d5b1c4e638dbcc6ea8f2c7503'; // Your client id
var client_secret = '3a48222e35d04373b191bdd77344fb0c'; // Your client secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri


//Package managment
var fs = require('fs');
var querystring = require('querystring');
var express = require('express');
var path = require('path');
var request = require('request');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');




//var MongooseDB = require('./model/Mongoose');
//console.log("DB: "+ MongooseDB);

//Models
//var UserModel = require('./model/User')

//temp
var token;
var user; // <--- move this to a session variable




//connect to the Database
var mongooseDB = require('./db/MongooseDB');
mongooseDB.initDB(function(mongoose){
   console.log("connected to orm db");
   dbConnected(mongoose);
});


//Bootstrap models
fs.readdirSync(__dirname + '/model/').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/model/' + file);
});

//Boostrap Routers
var routes = require('./routes/index');
var login = require('./routes/login')
var profiles = require('./routes/profiles')
var authCallback = require('./routes/authcallback')
var requirejs = require('requirejs');






function dbConnected(mongoose){
   console.log("connected to db");
}

// Kitten.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens)
// })




//});



var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};





//SET-Up the App
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({secret: '$sshhhhh123'}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);
//console.log(login);
app.use('/login',login);

app.use('/profiles',profiles);

app.use('/callback', authCallback);

// app.get('/login', function(req, res) {
//   process.stdout.write("In login route");

//   var state = generateRandomString(16);
//   console.log("LoginState:" + state);
//   res.cookie(stateKey, state);

//   // your application requests authorization
//   var scope = 'user-read-private user-read-email';
//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });

//todo figure out why res does not have storedState





// app.get('/callback', function(req, res) {

//   process.stdout.write("In callback route");

//   // your application requests refresh and access tokens
//   // after checking the state parameter

//   //console.log(req);

//   var code = req.query.code || null;
//   var state = req.query.state || null;
//   var storedState = req.cookies ? req.cookies[stateKey] : null;

//   console.log(req.cookies);

//   console.log("State:" +state);
//   console.log("Stored state: "+storedState);

//   // if (state === null || state !== storedState) {
//   //   res.redirect('/#' +
//   //     querystring.stringify({
//   //       error: 'state_mismatch'
//   //     }));
//   // } else {
//     res.clearCookie(stateKey);
//     var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };

//     request.post(authOptions, function(error, response, body) {
//       if (!error && response.statusCode === 200) {

//         var access_token = body.access_token,
//             refresh_token = body.refresh_token;

//             token = access_token;
//             spotifyApi.setAccessToken(token);

//         var options = {
//           url: 'https://api.spotify.com/v1/me',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };

//         // use the access token to access the Spotify Web API
//         request.get(options, function(error, response, body) {
//          console.log("Store the email address and auth token as a user, in mongo if not exist")
//           user = body;
//           console.log("set cookie session : "+user.id);
//           req.session.userId = user.id;
//           //res.redirect('/playlists/'+user.id);
//           res.redirect('/profiles')
//           console.log(user);
//         });

//         // we can also pass the token to the browser to make requests from there

//         // res.redirect('/#' +
//         //   querystring.stringify({
//         //     access_token: access_token,
//         //     refresh_token: refresh_token
//         //   }));
//       } else {
//         res.redirect('/#' +
//           querystring.stringify({
//             error: 'invalid_token'
//           }));
//       }
//     });
//   //}
// });

var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : client_id,
  clientSecret : client_secret,
  redirectUri : redirect_uri
});


app.get('/react', function(req, res){
   //process.stdout.write("Getting Index");
   res.render('react', { title: 'Hey boy', message: 'Hello there, dawg!'});
});


app.get('/playlists/:id', function(req, res) {
   var id = req.params.id;
   console.log(id);
   spotifyApi.getUserPlaylists(id)
  .then(function(data) {
    //res.send("hello world of spotify");
    //console.log('Retrieved playlists', data.body);
    var playlists = data.body.items;
    res.render('playlist', { playlists: playlists});
    console.log(playlists);
  },function(err) {
    res.send("Errored :(")
    console.log('Something went wrong!', err);
  });


});






var server = app.listen(8888);
