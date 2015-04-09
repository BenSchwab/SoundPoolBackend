var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var cookieParser = require('cookie-parser');


var auth = require('../modules/auth');



//console.log(auth);


/* GET Login page. */
router.get('/', function(req, res, next) {
  console.log("In login route");

  var state = auth.generateRandomString(16);
  console.log(auth.stateKey+" "+state);
  res.cookie(auth.stateKey, auth.state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email playlist-read-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: auth.client_id,
      scope: scope,
      redirect_uri: auth.redirect_uri,
      state: state
    }));
});

module.exports = router;
