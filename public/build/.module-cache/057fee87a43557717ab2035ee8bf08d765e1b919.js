var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];




var Comment = React.createClass({displayName: "Comment",
  render: function() {
    return (
      React.createElement("div", {className: "comment"}, 
        React.createElement("h2", {className: "commentAuthor"}, 
          this.props.author
        ), 
        this.props.children
      )
    );
  }
});


var CommentList = React.createClass({displayName: "CommentList",
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        React.createElement(Comment, {author: comment.author}, 
          comment.text
        )
      );
    });
    return (
      React.createElement("div", {className: "commentList"}, 
        commentNodes
      )
    );
  }
});



var CommentForm = React.createClass({displayName: "CommentForm",
  render: function() {
    return (
      React.createElement("div", {className: "commentForm"}, 
        "Hello, world! I am a CommentForm."
      )
    );
  }
});


var CommentBox = React.createClass({displayName: "CommentBox",
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
         React.createElement(CommentList, {data: this.props.data}), 
        React.createElement(CommentForm, null)
      )
    );
  }
});


React.render(
  React.createElement(CommentBox, {data: data}),
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
      var url = data.tracks.items[0].preview_url;
      console.log(url)
       sound = new Howl({
         urls: ['https://p.scdn.co/mp3-preview/03a8f4e30a4190c6668e9dfdab287ff30c3e1272'],
         autoplay: true,
         volume: 1
      });
      sound.play();

    }
  });


});


