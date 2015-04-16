var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');

var auth = require('../modules/auth');

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/', function(req, res) {
    var songID = req.body.songID;
    console.log("Got song rating post: "+ songID);

});



module.exports = router;

