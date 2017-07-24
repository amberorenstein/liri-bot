//Access to necessary files and keys, global variables
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var a = process.argv;

//function to get tweets so tweets are only printed when we want and not every time the file is run
var getTweets = function() {

  var client = new Twitter(keys.twitterKeys);
  //TWITTER
  var params = {screen_name:'amber_orenstein'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    //When there is no error, loop through all my tweets, printing the text and the created at time/date, otherwise log error
    if (!error) {
      for (var i = 0; i<tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("\n" + tweets[i].text);
      }
    }
  });

}

//Spotify
//Function to pull spotify data
var getSong = function(songName) {
var spotify = new Spotify(keys.spotifyKeys);
spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  console.log(data);
});
}

//OMDB call to pull movie database info
var getMovie = function(title) {
request('http://www.omdbapi.com/?t=' + title + '&y=&plot=short&apikey=40e9cece', function (error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(body)
  }
})
}

//Switch case to set parameters for process.argv[2] so the correct function is run
var pick = function(caseData, functionData) {
  switch (caseData) {
    case 'my-tweets':
    getTweets();
    break;
    case 'spotify-this-song' :
    getSong(functionData);
    break;
    case 'movie-this' :
    getMovie(functionData);
    //if user inputs something else as process.argv[2]  liri wll console log an error message
    default:
    console.log("LIRI doesn't get it");
  }
};

//function to run arguments through switch case
var runProg = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

//takes in user input from cli and runs through runProg function
//i.e. node liri-bot my-tweets ->prints my  tweets etc.
runProg(a[2], a[3]);
