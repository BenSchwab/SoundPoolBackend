var mongoose = require('mongoose');
var Playlist = mongoose.model('Playlist');
var SpotifyWebApi = require('../modules/SpotifyApiModule.js');
var UserController = require('../controllers/Users');


module.exports = UserController;
