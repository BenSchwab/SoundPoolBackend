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

//var UserController = require('./controllers/Users');

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
// fs.readdirSync(__dirname + '/model/').forEach(function (file) {
//   if (~file.indexOf('.js')) require(__dirname + '/model/' + file);
// });

require('./model/Playlist');
require('./model/Album');
require('./model/Artist');
require('./model/Genre');
require('./model/Song');
require('./model/Profile');
require('./model/User');

//Boostrap Routers
var index = require('./routes/index');
var login = require('./routes/login');
var profiles = require('./routes/profiles');
var authCallback = require('./routes/authcallback');
var enterRoom = require('./routes/enterRoom.js');

//posts
var ratesong = require('./routePost/rateSong');
var rateplaylist = require('./routePost/ratePlaylist');


//Load modules
var requirejs = require('requirejs');
var SpotifyWebApi = require('./modules/SpotifyApiModule.js');
var UserController = require('./controllers/Users');



function dbConnected(mongoose){
   console.log("connected to db");
}


//SET-Up the App
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({secret: '$sshhhhh123'}));

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', index);
//console.log(login);
app.use('/login',login);

app.use('/profiles',profiles);

app.use('/callback', authCallback);

app.use('/ratesong', ratesong);

app.use('/rateplaylist', rateplaylist);




app.get('/react', function(req, res){
   //process.stdout.write("Getting Index");
   res.render('react', { title: 'Hey boy', message: 'Hello there, dawg!'});
});


app.get('/playlists/', function(req, res) {
   var id = req.session.userId;
   UserController.get(id,function(err, user){
      console.log("In playlists route: " + user.id);
      SpotifyWebApi.setToken(user.accessToken);
      SpotifyWebApi.spotifyApi.getUserPlaylists(id).then(function(data) {
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


});






var server = app.listen(8888);
