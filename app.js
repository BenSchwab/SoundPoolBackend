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
require('./model/Room');
require('./model/RoomEntrant');


//Boostrap Routers
var index = require('./routes/index');
var login = require('./routes/login');
var profiles = require('./routes/profiles');
var authCallback = require('./routes/authcallback');
var enterRoom = require('./routes/enterRoom.js');

//posts
var ratesong = require('./routePost/rateSong');


//Load modules
var requirejs = require('requirejs');
var SpotifyWebApi = require('./modules/SpotifyApiModule.js');
var UserController = require('./controllers/Users');
var WebSocketServer = require('./modules/WebSocketManager');



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

var rateplaylist = require('./routePost/ratePlaylist');
app.use('/rateplaylist', rateplaylist);

app.use('/enterroom', enterRoom);

var createprofile = require('./routePost/createProfile');
app.use('/createprofile', createprofile);

var editprofile = require('./routes/editProfile');
app.use('/editProfile', editprofile);

var createRoom = require('./routePost/createRoom');
app.use('/createRoom', createRoom);

var room = require('./routes/room');
app.use('/room', room);

var room = require('./routes/waitingRoom');
app.use('/waitingRoom', room);

var closeRoom = require('./routePost/closeRoom');
app.use('/closeRoom', closeRoom);



app.get('/react', function(req, res){
   //process.stdout.write("Getting Index");
   res.render('react', { title: 'Hey boy', message: 'Hello there, dawg!'});
});


var port = process.env.PORT || 5000;


var server = app.listen(port, function(){
   console.log("App running on port: "+ port);
});

app.set('port', port);



var PlayListManager = {
   playlistManager:{0:[],1:[]},
   getPlayList: function(roomID){
      return playlistManager.roomID;
   },
   setPlaylist: function(playlist, roomID){
      this.playlistManager.roomID = playlist;
   }
};

app.set('PlayListManager', PlayListManager);







var wsServer = new WebSocketServer();
app.set('wsServer', wsServer);



// var Worker = require('webworker-threads').Worker;
// // var w = new Worker('worker.js'); // Standard API

// // You may also pass in a function:
// var worker = new Worker(function(){
//   postMessage("I'm working before postMessage('ali').");


//   this.onmessage = function(event) {
//     postMessage('Hi ' + event.data);
//     self.close();
//   };
// });
// worker.onmessage = function(event) {
//   console.log("Worker said : " + event.data);
// };
// worker.postMessage('ali');

// var Worker = require('webworker-threads').Worker;

// var fibo = new Worker(function() {
//     function fibo (n) {
//       return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
//     }
//     this.onmessage = function (event) {
//       postMessage(fibo(event.data));
//     };
//   });

// fibo.onmessage = function (event) {
//     console.log('fib(40) = ' + event.data);
// };
// fibo.postMessage(40);


// var Worker = require('webworker-threads').Worker;

// var fibo = new Worker('workers/fibo.js');

// fibo.onmessage = function (event) {
//     console.log('fib(40) = ' + event.data);
// };
// fibo.postMessage(40);




