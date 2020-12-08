/*
=-=-=-=-=-=-=-=-=-=-=-=-
Imgur Random Shibe Poster
=-=-=-=-=-=-=-=-=-=-=-=-
Student ID: 23686488
Comment (Required):
The user can visit the website and click on a button that will post a random 
Shibe Inu picture on Imgur under their account. 
=-=-=-=-=-=-=-=-=-=-=-=-
*/
// imports 
const http = require('http');
const https = require('https');
const port = 3069;
const server = http.createServer();
const fs = require("fs");
const url = require("url");
const credentials = require("./auth/credentials.json");

server.on("request", connection_handler);

function connection_handler(req, res){
    console.log(`New Request for ${req.url} from ${req.socket.remoteAddress}`);

    // root of the site 
    if(req.url === "/" || req.url === "/index.html"){
        const main = fs.createReadStream('html/main.html');
        res.writeHead(200, {'Content-Type':'text/html'});
        main.pipe(res);
    }

    // something here for posting the favicon
    // something here for banner image/gif and styling 

    // here it is if the button is clicked 
    else if(req.url.startsWith("/post_shibe_image")){
        send_access_token_request(res);
    }   

} //end of connection_handler

// this method first checks if you have cached or not - 
// but no then send a new request 
function send_access_token_request(res){
    console.log("The button click is registered and a new request is created")
    // format of request 
    // https://api.imgur.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=REQUESTED_RESPONSE_TYPE&state=APPLICATION_STATE

    // function to process incoming message
	function stream_to_message(stream, callback){
		let body = "";
		stream.on("data", (chunk) => body += chunk);
		stream.on("end", () => callback(body));
    }
    
    const token_endpoint = `https://api.imgur.com/oauth2/authorize/?client_id=${credentials.client_id}&response_type=token`;

    // create a new https request 
    let auth_request = https.get(token_endpoint, function(res){
        let chunks = [];

        res.on("data", function(chunk){
            chunks.push(chunk);
        })

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });

        res.on("error", function (error) {
            console.error(error);
        });

    });

    auth_request.end();
    
} // end of send access token request 

function receieved_authentication(message, res){
    console.log("inside recieved authenticaiton");
    let auth_token = JSON.parse(message);
    console.log(auth_token);
}

server.on("listening", listening_handler);
function listening_handler(){
	console.log(`Now Listening on Port ${port}`);
}
server.listen(port);

