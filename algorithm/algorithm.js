var RoomController = require('../controllers/RoomController');
var SpotifyWebApi = require('spotify-web-api-node');

var mongoose = require('mongoose');
var Profile = mongoose.model('Profile');

function Algo(){

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
      room.findEntrants(function(err, entrants){
         if(err) console.log(err);
         console.log(entrants);
         this.numSongs = room.numSongs;
         buildVoters(entrants);
      });
   };

   function buildVoters(entrants){
      this.voters = entrants.map(function(entrant){
         console.log("created voter: "+entrant.name);
         return new Voter(entrant);
      });
      console.log("Voters" + this.voters[0].name);
      buildCandidateTrackSet(this.voters);
   }

   function buildCandidateTrackSet(voters){
       var playlistPromises = voters.map(function(voter){
            return new Promise( function(resolve, reject){
            Profile.findOne({userID: voter.id, id :voter.profileID}, function(err, profile){
               profile.getPlaylists(function(err, playlists){
                  voter.playlists = playlists;
                  resolve();
               });
            });
         });

      });
       Promise.all(playlistPromises).then(function(){
         console.log("The playlists have been populated: "+ this.voters[0].playlists);
         grabSongs();
       },function(){
         console.log("Some promise failed");
       });

       function grabSongs(){
            var trackPromises = [];
            this.voters.forEach(function(voter){
               console.log("grabbing song for voter: "+voter.name);
               voter.playlists.forEach(function(playlist){
                  trackPromises.push(new Promise(function(resolve, reject){
                     playlist.getTracks(function(err, tracks){
                        if(err){
                           console.log("warning there was a playlist error! data incomplete");
                           resolve();
                        }
                        console.log("before track for each: "+ tracks);
                        tracks.forEach(function(track){
                           console.log("in tracks for each");
                           voter.trackVotes[track.track.id] = new TrackVote(track.track, rateMap(playlist.rating));
                        });
                        resolve();
                     }, playlist.id);
                  }));
               });
            });

            Promise.all(trackPromises).then(function(){
               console.log("Tracks have been populated "+ this.voters[0].trackVotes);

               //build the candidate set
               this.voters.forEach(function(voter){
                  for(var tid in voter.trackVotes){
                     this.candidateTracks[tid] = voter.trackVotes[tid.track];
                  }
               });

               //candidate set has been built

            }, function(){
               console.log(" Tracks have failed");
            });

       }

       //For reach voter, and each play list,
       //create a promise that gets the tracks and then maps the rating.


   }


  function runElection(){
      var count = 0;

      //While there are available songs to choose, run the election
      while(count<this.numSongs && Object.keys(this.candidateTracks).length >0)

         this.electedTracks.push(pickBestSong());
      }

   }

   function getScoreForVoter(voter, trackID){

   }

   function pickBestSong(){
      var bestSum = Math.MIN_VALUE;
      var bestID = null;
      for(var trackID in this.candidateTracks){

      }
   }

   function inferSongScore(){
      //
   }

   var votingMatrix;

   function determineWelfareBoost(){

   }

   function getVoterScore(voter, song){

   }



   function Voter(roomEntrant){
      this.name = roomEntrant.name;
      this.id = roomEntrant.userID;
      this.profileID = roomEntrant.profileID;
      this.trackVotes = {}; //map trackID: trackVote
      this.utility = 0;
      this.utilityHistory = [];

      this.getScoreOfTrack = function(){

      }
      //
   }



   function TrackVote(track, vote){
      this.track = track;
      this.score = vote;
   }

   function rateMap(rate){
      if(rate=='love'){
         return 10;
      }
      if(rate=='hate'){
         return -7;
      }
      return 0;
   }

}



module.exports = Algo;