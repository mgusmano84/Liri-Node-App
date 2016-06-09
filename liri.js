//list of global vars
var key1 = require("./keys.js");
var keyT = key1.twitterKeys;
var request = require("request");
var first = process.argv[2];
var second = process.argv[3];
var fs = require('fs');


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
       	 	spotThis();
        	break;
    	case 'do-what-it-says':
        	lotto();
        	break;
	}
}




function myTweets(){

	var Twitter = require('twitter');
	var client = new Twitter(keyT);
	//This will grab the twitter username and the last 20 tweets
	client.get('statuses/user_timeline', {screen_name: 'gusmano84', count: 20}, function(error, tweets, response) {
		//loop the tweets to be logged
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

function movieThis(){
	movieName= "";
	var nodes = process.argv;

	//This loops through the movies typed in
	for (var i=3; i<nodes.length; i++){

   	 	if (i>3 && i< nodes.length){

        movieName = movieName + "+" + nodes[i];

   		 }

    	else {

        movieName = movieName + nodes[i];
    	}
	}

	// Run Request to OMDB API with movie name
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&tomatoes=true&r=json';


	request(queryUrl, function (error, response, body) {

    	
    	if (!error && response.statusCode == 200) {

    		// if (movieName= "") {
      //   	console.log("mr nobody")
      //   }

        

      	//Parse through IMBD data and console long the below objects
        console.log("Title: " + JSON.parse(body)["Title"]);
        console.log("Released: " + JSON.parse(body)["Year"]);
        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
        console.log("Country: " + JSON.parse(body)["Country"]);
        console.log("Plot: " + JSON.parse(body)["Plot"]);
        console.log("Actors: " + JSON.parse(body)["Actors"]);
        console.log("Rotton Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);

        //store the returns in log.txt
       	fs.appendFile("./log.txt",' \nTitle: '+ JSON.parse(body)["Title"] + ' \nYear: ' + JSON.parse(body)["Year"]  + ' \nIMBD Rating: ' + JSON.parse(body)["imdbRating"] + ' \nCountry: ' + JSON.parse(body)["Country"] + ' \nPlot: '+ JSON.parse(body)["Plot"] + ' \nActors: ' + JSON.parse(body)["Actors"] + ' \nRotten Tomatoes URL: '+ JSON.parse(body)["tomatoURL"], function(err) {
	    		if(err) {
	       	 			return console.log(err);
	    		} 
			});

        
    	}
	});
}

function spotThis (){
	var spotify = require('spotify');
}





startApp(first,second);