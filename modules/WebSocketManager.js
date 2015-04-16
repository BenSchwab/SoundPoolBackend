var express = require('express');


var RoomController = require("../controllers/RoomController");
var rController = RoomController();
var active_websockets = [];

var that;

function WebSocketManager(server){
   var WebSocketServer = require('ws').Server;
   var wss = new WebSocketServer({ server: server });
   that = this;

   this.roomTracks = {};


   var clearOutClosedConnection = function(ws){
      active_websockets = active_websockets.filter(function(conn){
            console.log("Found connection to clear: "+ (conn.ws == ws));
             return conn.ws != ws;
      });
   };

   this.getConnectionsForRoom = function(roomID){
     return active_websockets.filter(function(conn){
          console.log("connetions for room: "+ conn.roomID +" =?= "+roomID);
         return conn.roomID == roomID;
      });
   };


   this.messageRoomPlaylist  = function(roomID, tracks){
       var con = this.getConnectionsForRoom(roomID);
       this.roomTracks[roomID] = tracks;
       con.forEach(function(connection){
          console.log("messaging connection "+roomID);
          sendPlaylist(tracks, connection.ws);
      });
       //var payload = {room:room, tracks:tracks};
       //ws.send(JSON.stringify({roomID: 123, playlist:["123124", "1314123", "124123123"]}));
       //ws.send(JSON.stringify(payload));
      };
   this.messageWaitingList = function(room){
      console.log("messaging waiting list");
      var con = this.getConnectionsForRoom(room.id);
      console.log("waiting list size: "+con.length);
      con.forEach(function(connection){
          console.log("messaging connection "+room);
          refreshRoomUsers(room.id, connection.ws);
      });
   };
   this.closeOutRoom = function(roomID){
      var con = this.getConnectionsForRoom(roomID);
       con.forEach(function(connection){
          console.log("messaging connection "+roomID);
          closeRoom(roomID, connection.ws);
      });
   };

   this.checkForSongs = function(roomID,ws){
    if(roomID in this.roomTracks){
      sendPlaylist(this.roomTracks[roomID],ws);
    }
  };

   // this.sendPlaylist = function(room, playlist){
   //     var con = this.getConnectionsForRoom(roomID);
   //      con.forEach(function(connection){
   //        console.log("messaging connection "+roomID);
   //        sendPlaylist(playlist, connection.ws);
   //    });
   // };


   //Turn on the connection.
    wss.on('connection', function connection(ws) {

      ws.on('message', function incoming(message) {
          handleMessage(message, ws);
          console.log('received: %s', message);
      });
      ws.on('close', function close() {
         console.log("Socket Closed");
         clearOutClosedConnection(ws);
         //remove the connection!
       });

   });
}

//
function Connection(roomID, ws){
      this.roomID = roomID;
      this.ws = ws;
}


function handleMessage(msg, ws){
  console.log("Handling message");
  var message = JSON.parse(msg);
  if(message.action == 'registerWait'){
      registerWaitlistSocket(message.roomID, ws);
      that.checkForSongs(message.roomID, ws);
  }
  else if(message.action == 'getRoomUsers'){
      var roomID = message.roomID;
      refreshRoomUsers(roomID, ws);
  }
  else if (message.action == 'getPlaylist'){
     //sendPlaylist(, ws);
  }
}

function registerWaitlistSocket(roomID, ws){
   console.log("registered waitlist socket");
   active_websockets.push(new Connection(roomID, ws));

}

function sendPlaylist(playlist, ws){
  ws.send(JSON.stringify({action:'playlistUpdate', body:playlist}));
}

function closeRoom(roomID, ws){
  ws.send(JSON.stringify({action:'roomClose'}));
}

function refreshRoomUsers(roomID, ws){
  console.log("refreshing room users: "+roomID);
   rController.getEntrants(roomID, function(err, entrants){
          if(err) console.log(err);
          else{
            console.log("Number of entrants found in "+roomID +" "+entrants.length);
            ws.send(JSON.stringify({action:'getRoomUsers', data:entrants}));
          }
      });
}


module.exports = WebSocketManager;