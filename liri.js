require('dotenv').config();

var keys = require(“./keys.js”);

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var command = process.argv[2];
var userInput = process.argv[3];


var client = new Twitter(keys.twitter);
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
	if (!error) {
    	console.log(tweets);
	}
});


var spotify = new Spotify(keys.spotify);

function tweet() {
	if (userInput == null) {
		userInput = "The Sign Ace of Base";
	}
	spotify.search(
		{
			type: 'track',
			query: userInput
		},
		
		function(err, data) {
			var song;
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			console.log(data); 
	});
};