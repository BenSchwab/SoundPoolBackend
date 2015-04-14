var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];




var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});


var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});



var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});


var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
         <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});


React.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);

var sound;

$(document).ready(function(){

  var spotifyApi = new SpotifyWebApi();


  spotifyApi.getAlbum('5U4W9E5WsYb2jUQWePT8Xm',function(err, data) {
    if (err) console.error(err);
    else console.log('Artist albums', data);
  });

  spotifyApi.searchTracks("Time of my life", function(err, data) {
    if (err) console.error(err);
    else {
      console.log(data);
      var url = data.tracks.items[1].preview_url;
      console.log(url)
       sound = new Howl({
         urls: [url+'.mp3'],
         autoplay: true,
         volume: 1
      });
      sound.play();

    }
  });


});


