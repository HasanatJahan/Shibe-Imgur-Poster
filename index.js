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
const authentication_cache = "./auth/authentication-res.json";

// time for the program
const date_ob = new Date();
const date = ("0" + date_ob.getDate()).slice(-2);
const year = date_ob.getFullYear();
const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
const hours = date_ob.getHours();
const minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
const time_of_program = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
console.log(time_of_program);

server.on("request", connection_handler);

function connection_handler(req, res){
    console.log(`New Request for ${req.url} from ${req.socket.remoteAddress}`);

    // root of the site 
    if(req.url === "/" || req.url === "/index.html"){
        const main = fs.createReadStream('html/main.html');
        res.writeHead(200, {'Content-Type':'text/html'});
        main.pipe(res);
    }

    // something here for banner image/gif and styling 

    // here it is if the button is clicked 
    else if(req.url.startsWith("/post_shibe_image")){
        // check if you have cached data 
        let cache_valid  = false;
        if(fs.existsSync(authentication_cache)){
            const cache_auth = require(authentication_cache);
            if(new Date(cache_auth.expiration) > Date.now()/1000){
                cache_valid = true;
            }
        }
        if(cache_valid){
           console.log("Cache is valid");
           cache_auth = require(authentication_cache);
           console.log("sending a request to process shibe image immediately")
           get_shibe_image(cache_auth.access_token);
           res.writeHead(200, {'Content-Type':'text/html'});
           const main = fs.createReadStream('html/main.html');
           main.pipe(res);

        }
        else if(!cache_valid){
            console.log("redirect to imgur happening");
            redirect_to_imgur(res);
        }
        else{
            res.writeHead(404, {'Content-Type':'text/html'});
		    res.end(`<h1>404 Not Found.</h1>`);
        }
    }   

    // if the code is received 
	if(req.url.startsWith("/receive_code")){
        const main = fs.createReadStream('html/receive_code.html');
        res.writeHead(200, {'Content-Type':'text/html'});
        main.pipe(res);
    }

    if(req.url.startsWith("/catchtoken")){
        // processing here that saves it here 
        const token_body = url.parse(req.url, true).query;
        const access_token = token_body.access_token;

        //modify access time 
        let imgur_auth = token_body;
        const auth_sent_time = Date.now();
        imgur_auth.expiration = 3600 + auth_sent_time;
        
        create_access_token_cache(imgur_auth);
        get_shibe_image(access_token);
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
    // console.log(authorization_location);

    res.writeHead(302, {'Location': authorization_location});
    res.end();
    
} // end of redirect_to_imgur 

function get_shibe_image(access_token){
    let image_url = "https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true";
    const shibe_img_request = https.get(image_url, (incoming_message) =>{
        const chunks = [];
        incoming_message.on("data", (data) =>{
            chunks.push(data);
        })
        incoming_message.on("error", (err) =>{
            console.log(err);
        })
        incoming_message.on("end", () =>{
            const body = Buffer.concat(chunks);
            let url_result_json = JSON.parse(body);

            // this is making a call to post to imgur 
            post_image_to_imgur(access_token, url_result_json);
        })
    });
    shibe_img_request.end();
}

function post_image_to_imgur(access_token, url_result_json){
    const options = {
        method: "POST",
        "hostname": "api.imgur.com",
        "port": null,
        "path": "/3/upload",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/x-www-form-urlencoded" 
        }
    };

    const req = https.request(options, function (res) {
        const chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("error", (err) =>{
            console.log(err);
        })
      
        res.on("end", function () {
          const body = Buffer.concat(chunks);
        //   console.log(body.toString());
        });
    });
      
    const title_text = `WOW WOW ${time_of_program}`;
    req.write(querystring.stringify({
        type: 'url',
        image: url_result_json, 
        title : title_text
    }), () => req.end());
    
}

function create_access_token_cache(imgur_auth){
    const JSON_auth = JSON.stringify(imgur_auth);
    fs.writeFile(authentication_cache, JSON_auth, (err) =>{
		if (err){
			throw err;
		}
	});
}

server.on("listening", listening_handler);
function listening_handler(){
	console.log(`Now Listening on Port ${port}`);
}
server.listen(port);

