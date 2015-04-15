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



app.get('/react', function(req, res){
   //process.stdout.write("Getting Index");
   res.render('react', { title: 'Hey boy', message: 'Hello there, dawg!'});
});


var server = app.listen(8888);



// // note, io.listen() will create a http server for you
// var io = require('socket.io').listen(8080);

// io.sockets.on('connection', function (socket) {
//   io.sockets.emit('this', { will: 'be received by everyone' });

//   socket.on('private message', function (msg) {
//     console.log('I received a private message from ', socket.id, ' saying ', msg);
//     // Echo private message only to the client who sent it
//     io.socket.emit('private message', msg);
//   });

//   socket.on('disconnect', function () {
//     // This will be received by all connected clients
//     io.sockets.emit('user disconnected');
//   });
// });

//Websocket handling code
active_websockets = [];



var wsServer = new WebSocketServer();

app.set('wsServer', wsServer);




// var WebSocketServer = require('ws').Server,
//  wss = new WebSocketServer({ port: 8080 });
// function messageRoom(tracks, room){
//     var payload = {room:room, tracks:tracks};

//     //ws.send(JSON.stringify(payload));
// }

// //open up a websocket
// wss.on('connection', function connection(ws) {
//    active_websockets.push();
//    ws.on('message', function incoming(message) {
//        console.log('received: %s', message);
//        ws.send(JSON.stringify({roomID: 123, playlist:["123124", "1314123", "124123123"]}));
//    });
//    ws.on('close', function close() {
//       console.log("Socket Closed");
//    });

// });
