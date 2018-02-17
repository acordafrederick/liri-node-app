require('dotenv').config()

// var keys = require(“./keys.js”);
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

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
	
	case "movie-this":
		if (input) {
			omdb(input);
		}
		else {
			omdb("Mr. Nobody");
		}
		break;

}

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

var client = new Twitter(keys.twitter);


var spotify = new Spotify(keys.spotify);
