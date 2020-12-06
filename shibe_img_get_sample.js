var https = require('https');
var fs = require('fs');
const qs = require("querystring");

let download_images = 0;
let album_art_paths = [];
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
        console.log(`This is the url result json ${url_result_json}`);
        post_image_to_imgur(url_result_json);
    })
})

shibe_img_request.end();



function post_image_to_imgur(url_result_json){
    console.log(url_result_json);
    let url_result_string = url_result_json.join("");
    console.log(url_result_string);
    const options = {
        "method": "POST",
        "hostname": "api.imgur.com",
        "port": null,
        "path": "/3/upload",
        "headers": {
          "Authorization": "Bearer 80810473b84f865cf5860f3aa628d0c4e4e0dd32",
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": "0"
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
          console.log(body.toString());
        });
    });
      

    req.write(qs.stringify({
        type: 'url',
        image: "https://cdn.shibe.online/shibes/4fb68c74afa0cce1f5e329f6359cf4f0279cc54b.jpg"
    }), () => req.end());
    
}


