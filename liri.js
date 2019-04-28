require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');

// var choice = "",

inquirer.prompt([{
  type: 'list',
  name: 'listChoices',
  message: 'What do you want to do?',
  choices: ['Look up Concerts?', 'Search for a Song?', 'Find a Movie?']
}
]).then(function(response){

  // var choicelist = response.command;
  // choice =

  switch (response.listChoices) {
    case 'Look up Concerts?':
     bandsApi();
     break;
    case 'Search for a Song?':
     spotifyApi();
     break;
    case 'Find a Movie?':
     omdbApi();
     break;
  }

});

function bandsApi(){
  inquirer.prompt([{
    type:'input',
    name: 'band'
    message: "Which band would you like to search?"
  }
  ]).then(function(response){
    var searchBand = response.band;

    axios.get("https://rest.bandsintown.com/artists/" + searchBand + "/events?app_id=codingbootcamp")
    .then(function(response){
      for(var i =0; i < response.data.length; i++){
        var bResult = response.data[1].datetime;
        console.log("Date of the Event: " + moment(bResult).format("MM/DD/YYYY"));
        console.log("Name of the Venue: " + response.data[i].venue.name);
        console.log("Location: " + response.data[i].venue.city);

      }
    })
  })
}

//Spotify API
function spotifyApi(){
  inquirer.prompt([{
    type:'input',
    name: 'spotify'
    message: "Which song would you like to search?"
  }
  ]).then(function(response){
    var searchSpot = response.spotify;

    axios.get("https://rest.bandsintown.com/artists/" + searchSpot + "/events?app_id=codingbootcamp")
    .then(function(response){
      for(var i =0; i < response.spot.length; i++){
        // var sResult = response.spot[1];
        console.log("Artist(s): " + response.spot[i].artist);
        console.log("Song: " + response.spot[i].items);
        console.log("Album: " + response.data[i].album);

      }
    })
  })
}

;
