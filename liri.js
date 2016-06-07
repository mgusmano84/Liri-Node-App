var key1 = require("./keys.js");
var keyT = key1.twitterKeys;
var request = require("request");
var first = process.argv[2];
var second = process.argv[3];
var fs = require('fs');


// var twitter = process.argv[2];

// request(url, function(err, response, body) {
// 	body = JSON.parse(body);
// 	console.log(body.Released);
// });

// var twitterURL ="https://api.twitter.com/oauth/request_token";

//call names from terminal
function startApp(first, second){
	switch(first){
		case 'my-tweets':
		//calls twitter
			myTweets();
			break;
    	case 'movie-this':
    	//calls the movie slection
        	movieThis();
        	break;
    	case 'spotify-this-song':
       	 	withdraw();
        	break;
    	case 'do-what-it-says':
        	lotto();
        	break;
	}
}

switch(action){
    case 'total':
        total();
        break;
    case 'deposit':
        deposit();
        break;
    case 'withdraw':
        withdraw();
        break;
    case 'lotto':
        lotto();
        break;
}


function myTweets(){

	var Twitter = require('twitter');
	var client = new Twitter(keyT);
	client.get('statuses/user_timeline', {screen_name: 'gusmano84', count: 20}, function(error, tweets, response) {
	
		for (var prop in tweets) {
  			console.log(tweets[prop].text);
   			console.log(tweets[prop].created_at);
	
			fs.appendFile("./log.txt", tweets[prop].text + ' \n' + tweets[prop].created_at  + ' \n', function(err) {
	    		if(err) {
	       	 			return console.log(err);
	    		} 
			});
		}
	});	

}





startApp(first,second);