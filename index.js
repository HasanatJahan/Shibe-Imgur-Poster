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
const querystring = require("querystring");
const credentials = require("./auth/credentials.json");
const host = "localhost";

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
        redirect_to_imgur(res);
        return
    }   

    // if the code is received 
	if(req.url.startsWith("/receive_code")){
        console.log(req.url);
        const code = url.parse(req.url, true).query;
        // console.log(`This is the code ${code}`)
        // receieved_authentication(code, res);
    }

} //end of connection_handler


// this method first checks if you have cached or not - 
// but no then send a new request 
function redirect_to_imgur(res){
    console.log("The button click is registered and a new request is created")
    // format of request 
    // https://api.imgur.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=REQUESTED_RESPONSE_TYPE&state=APPLICATION_STATE
    let options = {
        client_id : credentials.client_id,
        response_type : "token"
    }
    let uri = querystring.stringify(options);    
    const authorization_endpoint = "https://api.imgur.com/oauth2/authorize"

    const authorization_location = `${authorization_endpoint}?${uri}`;
    console.log(authorization_location);

    res.writeHead(302, {'Location': authorization_location});
    res.end();
    
} // end of redirect_to_imgur 

// function receieved_authentication(message, res){
//     console.log("inside recieved authenticaiton");
//     // let auth_token = JSON.parse(message);
//     const queryObject = url.parse(res.url,true).query;
//     console.log(queryObject);    
//     // console.log(`This is the auth access token ${auth_token}`);
// }

server.on("listening", listening_handler);
function listening_handler(){
	console.log(`Now Listening on Port ${port}`);
}
server.listen(port);

