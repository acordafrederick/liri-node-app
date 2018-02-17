require('dotenv').config();

// var Twitter = require('twitter');
// var Spotify = require('node-spotify-api');
var request = require('request');
// var keys = require(“./keys.js”);

var command = process.argv[2];
var argument = process.argv;
var input = "";
	for (var i = 3; i < argument.length; i++) {
		if (i > 3 && i < argument.length) {
			input = input + "+" + argument[i];
		}
		else {
			input += argument[i];
		}
	};

switch (command) {
	// case "my-tweets":
	// 	tweet();
	// 	break;

	case "movie-this":
		if (input) {
			omdb(input);
		}
		else {
			omdb("Mr. Nobody");
		}
		break;
	// case "do-what-it-says":

}

// var client = new Twitter(keys.twitter);
// var params = {screen_name: 'alpreedo'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
// 	if (!error) {
// 		// for (var i = 0, i < tweets.length)
//     	console.log(tweets);
// 	}
// });


// var spotify = new Spotify(keys.spotify);

// function tweet() {
// 	if (userInput == null) {
// 		userInput = "The Sign Ace of Base";
// 	}
// 	spotify.search(
// 		{
// 			type: 'track',
// 			query: userInput
// 		},
		
// 		function(err, data) {
// 			var song;
// 			if (err) {
// 				return console.log('Error occurred: ' + err);
// 			}
// 			console.log(data); 
// 	});
// };

function omdb(movie) {
	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var body = JSON.parse(body);
			console.log("Title: " + body.Title);
			console.log("Release Year: " + body.Year);
			console.log("IMdB Rating: " + body.imdbRating);
			console.log("Country: " + body.Country);
			console.log("Language: " + body.Language);
			console.log("Plot: " + body.Plot);
			console.log("Actors: " + body.Actors);
		}
		else {
			console.log("Error");
		}
		if (movie === "Mr. Nobody") {
			console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
			console.log("It's on Nerflix!");
		}
	});
}