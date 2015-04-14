module.exports = {
  initDB: function(connectionCallback){
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://pooladmin:cs290@ds061751.mongolab.com:61751/songpooldb');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
      connectionCallback(mongoose);
   });
  }
};



