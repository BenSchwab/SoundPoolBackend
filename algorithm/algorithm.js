var RoomController = require('../controllers/RoomController');
var SpotifyWebApi = require('spotify-web-api-node');

var mongoose = require('mongoose');
var Profile = mongoose.model('Profile');

function Algo(sockets){
   this.sockets = sockets;
   this.voters = [];
   this.candidateTracks = {};

   this.voteMatrix = {};

   this.electedTracks = [];
   this.expectedUtility = [];


   /*Algorithm Steps:
   1) Build the voter set
   2) Build the candidate track set
   3) Run iteration n times
      - Scan over column sums for highest song that

   */

   this.calculateOptimalPlaylist = function(room, callback){
      try {
         var that = this;
         this.room = room;
         this.callback = callback;
         room.findEntrants(function(err, entrants){
            if(err) console.log(err);
            console.log(entrants);
            that.numSongs = room.numSongs;
            that.buildVoters(entrants);
         });
       }
       catch(err){
         console.log(err);
       }
   };


   this.buildVoters = function(entrants){
      this.voters = entrants.map(function(entrant){
         console.log("created voter: "+entrant.name);
         return new Voter(entrant);
      });
      console.log("Voters" + this.voters[0].name);
      this.buildCandidateTrackSet(this.voters);
   };

   this.buildCandidateTrackSet = function(voters){
      console.log("in build candidates");
       var that = this;
       var playlistPromises = this.voters.map(function(voter){
            return new Promise( function(resolve, reject){
               console.log("in candidate promise");
            Profile.findOne({userID: voter.id, id :voter.profileID}, function(err, profile){
               console.log("Got profile"+profile.id);
               profile.getPlaylists(function(err, playlists){
                  voter.playlists = playlists;
                  console.log("resolving primise");
                  resolve();
               });
            });
         });

      });
       Promise.all(playlistPromises).then(function(){
         console.log("The playlists have been populated: "+ that.voters[0].playlists);
         that.grabSongs();
       },function(){
         console.log("Some promise failed");
       });
    };

    this.grabSongs = function(){
         var that = this;
         console.log("grabbing songs");
         var trackPromises = [];
         this.voters.forEach(function(voter){
            console.log("grabbing song for voter: "+voter.name);
            voter.playlists.forEach(function(playlist){
               trackPromises.push(new Promise(function(resolve, reject){
                  playlist.getTracks(function(err, tracks){
                     if(err || !tracks){
                        console.log("warning there was a playlist error! data incomplete");
                        resolve();
                     }
                     console.log("before track for each: "+ tracks);
                     tracks.forEach(function(track){
                        console.log("in tracks for each");
                        voter.trackVotes[track.track.id] = new TrackVote(track.track, that.rateMap(playlist.rating));
                        console.log("done tracks for each");
                     });
                     console.log("resolved that one");
                     resolve();
                  }, playlist.id);
               }));
            });
         });

         Promise.all(trackPromises).then(function(){
            console.log("Tracks have been populated "+ that.voters[0].trackVotes);

            //build the candidate set
            that.voters.forEach(function(voter){
               console.log("working on first voter");
               //TODO BUG STOPPING HERE
               for(var tid in voter.trackVotes){
                  console.log("itr ");
                  var track = voter.trackVotes[tid];
                  console.log("track: "+this.candidateTracks);
                  that.candidateTracks[tid] = track.track;
                  console.log("stalling here");
               }
               console.log("done on first voter");
            });

            console.log("Done building the candidate set");

            //RUN THE ELECTION!!
            that.runElection();

            //candidate set has been built

         }, function(){
            console.log(" Tracks have failed");
         });

    };

       //For reach voter, and each play list,
       //create a promise that gets the tracks and then maps the rating.





  this.runElection = function(){
   console.log("running election");
      var count = 0;

      console.log("number of songs "+this.numSongs);

      //While there are available songs to choose, run the election
      while(count<this.numSongs && Object.keys(this.candidateTracks).length >0){
         console.log("Trying to pick the best song");
         var bestSong = this.pickBestSong();
         console.log("best song: "+bestSong);

         this.electedTracks.push(bestSong);

         for(var i = 0; i<this.voters.length; i++){
            var voter = this.voters[i];
            voter.addUtility(bestSong);
         }

         delete this.candidateTracks[bestSong];
         count++;
      }
      console.log(this.electedTracks);

      this.callback(this.electedTracks);



   };


   this.pickBestSong = function(){
      console.log("in pick best song");
      //could cause a bug in edge cause of all dislikes and huge list
      var bestSum = -900000000;
      var bestID = null;
      for(var trackID in this.candidateTracks){
         console.log("looking at track: "+trackID);
         var currentSum = 0 ;
         for(var i = 0; i<this.voters.length; i++){
            var voter = this.voters[i];
            console.log("looking at voter: "+voter.name);
            currentSum += voter.getScoreOfTrack(trackID);
         }
         if(currentSum>bestSum){
            bestSum = currentSum;
            bestID = trackID;
         }
      }
      return bestID;
   };

   this.inferSongScore = function(){
      //
   };

   var votingMatrix;




   function Voter(roomEntrant){
      this.name = roomEntrant.name;
      this.id = roomEntrant.userID;
      this.profileID = roomEntrant.profileID;
      this.trackVotes = {}; //map trackID: trackVote
      this.utility = 0;
      this.utilityHistory = [];

      this.getScoreOfTrack = function(tid){
         if(tid in this.trackVotes){
            var score = this.determineWelfareBoost(this.utility)*this.trackVotes[tid].score;
            console.log(score);
            return score;
         }
         else {
            //run infer track score
            console.log("TODO look at albums/artists");
            return 0;

         }
      };

      this.determineWelfareBoost = function(utility){
         if(utility<0){
            return Math.abs(utility);
         }
         return 1/(1+utility);
      };

      this.addUtility = function(tid){
          var score;
         if(tid in this.trackVotes){
            score = this.trackVotes[tid].score;
         }
         else{
            score = 0;
         }
         this.utility += score;
      };

   }



   function TrackVote(track, vote){
      this.track = track;
      this.score = vote;
   }

   this.rateMap = function(rate){
      if(rate=='love'){
         return 10;
      }
      if(rate=='hate'){
         return -7;
      }
      return 0;
   };
}





module.exports = Algo;