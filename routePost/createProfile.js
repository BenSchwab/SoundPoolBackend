var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');

var auth = require('../modules/auth');

var mongoose = require('mongoose');
var UserController = require('../controllers/Users');



router.post('/', function(req, res) {
    var profileName = req.body.profileName;
    var uController = UserController(req.session.userID);
    uController.createProfile(profileName, function(err, prof){
      if(err) console.log(err);
      else{
         console.log("prof: "+ prof);
         res.redirect('/profiles');
      }

    });
    console.log("Got prof creaging post: "+ profileName);

});



module.exports = router;

