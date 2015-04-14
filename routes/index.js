var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
   console.log("session: "+req.session.userId);
   process.stdout.write("Getting Index");
   res.render('index', { title: 'Hey boy', message: 'Hello there, dawg!'});
});

module.exports = router;
