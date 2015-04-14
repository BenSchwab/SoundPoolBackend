console.log("init user");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
   display_name: String,
   id: String,
   songs: [{type: Schema.Types.ObjectId, ref: 'Song'}],
   artists: [{type: Schema.Types.ObjectId, ref: 'Artist'}],
   albums: [{type: Schema.Types.ObjectId, ref: 'Album'}],
   genres: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
});

mongoose.model('Profile', ProfileSchema);