var key1 = require("./keys.js");
var request = require("request");
var first = process.argv[2];
var second = process.argv[3];

var twitter = process.argv[2];

request(url, function(err, response, body) {
	body = JSON.parse(body);
	console.log(body.Released);
})

var twitterURL ="https://api.twitter.com/oauth/request_token";

//call names from terminal
function startApp(first, second){
	switch(first){
		case 'my-tweets':
		//calls twitter
			myTweets();
	};
}

startApp(first,second);