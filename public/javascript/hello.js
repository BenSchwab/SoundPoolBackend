//BootstrapDialog.alert('I want banana!');
// $(document).ready(function() {
//   BootstrapDialog.show({
//               message: $('<div></div>').load('remote.html')
//           });
// });

$(document).ready(function(){

  var spotifyApi = new SpotifyWebApi();


  spotifyApi.getAlbum('5U4W9E5WsYb2jUQWePT8Xm',function(err, data) {
    if (err) console.error(err);
    else console.log('Artist albums', data);
  });

  spotifyApi.searchTracks("Time of my life", function(err, data) {
    if (err) console.error(err);
    else console.log('Search ', data);
  });


});





