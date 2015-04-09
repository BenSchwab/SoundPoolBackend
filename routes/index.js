var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   process.stdout.write("Getting Index");
   res.render('index', { title: 'Hey boy', message: 'Hello there, dawg!'});
});

module.exports = router;
