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
    // else if(req.url.startsWith("/post_shibe_image/")){
    //     console.log("it's coming in here!");
    // }   

} //connection_handler

server.listen(port);

