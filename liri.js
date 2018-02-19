var dotenv = require('dotenv').config();

var request = require('request');
var keys = require("./keys.js");

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var fs = require('fs');

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
			movieThis(input);
		}
		else {
			movieThis("Mr. Nobody");
		}
		break;

	case "my-tweets":
		myTweets();
		break;

	case "spotify-this-song":
		if (input) {
			spotifyThisSong(input);
		}
		else {
			spotifyThisSong("The Sign");
		}
		break;

	case "do-what-it-says":
		doWhatItSays();
		break;

}

function doWhatItSays() {
	fs.readFile('random.txt', "utf8", function(error, data){
		var txt = data.split(',');
		spotifyThisSong(txt[1]);
	});
}

function spotifyThisSong(song) {
	spotify.search({
		type: 'track',
		query: song
	},
	function(error, data) {
		if (!error) {
			for (var i = 0; i < data.tracks.items.length; i++) {
				var songData = data.tracks.items[i];
				console.log("Artist: " + songData.artist.name);
				console.log("Title: " + sondData.name);
				console.log("Preview URL: " + songData.preview_url);
				console.log("Album: " + songData.album.name);
			}
    	return console.log('Error occurred: ' + err);
  		}
		else {
			console.log("Error");
		}
	});
}

function myTweets() {
	var params = {screen_name: 'alpreedo'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				console.log("----------- tweets ----------")
				console.log(params.screen_name + " tweeted: " + tweets[i].text + " on " + tweets[i].created_at);
			}
  		}
  		else {
  			console.log("Error");
  		}
	});
}


function movieThis(movie) {
	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var body = JSON.parse(body);
			console.log("---------- movie info ----------")
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
