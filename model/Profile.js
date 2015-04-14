console.log("init user");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
   name: String,
   id: String,
   userID: String
});

mongoose.model('Profile', ProfileSchema);