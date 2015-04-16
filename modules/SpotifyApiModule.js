var client_id = '1adddf5d5b1c4e638dbcc6ea8f2c7503'; // Your client id
var client_secret = '3a48222e35d04373b191bdd77344fb0c'; // Your client secret
var redirect_uri = 'http://still-depths-3109.herokuapp.com/callback'; // Your redirect uri

var SpotifyWebApi = require('spotify-web-api-node');


var SpotifyApi = function(user){
   this.spotifyApi = new SpotifyWebApi({
     clientId : client_id,
     clientSecret : client_secret,
     redirectUri : redirect_uri
   });
   if(user){
      this.spotifyApi.setAccessToken(user.accessToken);
   }
};



module.exports = SpotifyApi;
