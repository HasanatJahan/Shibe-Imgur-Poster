var https = require('https');
var fs = require('fs');

let download_images = 0;
let album_art_paths = [];
let image_url = "https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true";
	// create a request for the images 
	// let image_req = https.get(image_url, function(image_res){
	// 	// console.log(image_url.slice(24));
	// 	// let slice_url = image_url.slice(24);
	// 	console.log(image_res);
	// 	// let new_img= fs.createWriteStream(`./shibe_img/${slice_url}.png`, {'encoding':null});
	// 	// image_res.pipe(new_img);
	// 	// album_art_paths.push(`./album-art/${slice_url}.png`);

	// 	// new_img.on("finish", function(){
	// 	// 	download_images++;
	// 	// 	if(download_images === album_items_length){
	// 	// 		console.log(album_art_paths);
	// 	// 		// generate_webpage(res, album_art_paths);
	// 	// 		// reset download images for each request 
	// 	// 		download_images = 0;
	// 	// 		// album_art_paths = [];
	// 	// 	}
	// 	// });
	// });

	// image_req.on("error", function(err){
	// 	console.log(err);
	// });

    // const shibe_img_req = https.request(image_url, (incoming_message) =>{
	// 	const chunks = []
	// 	incoming_message.on("data", (data) =>{
	// 		chunks.push(data);
	// 	});

	// 	incoming_message.on('error', (err) =>{
	// 		console.log(error);
	// 	});

	// 	incoming_message.on("end", () =>{
	// 		const body = Buffer.concat(chunks);
	// 		let search_result_json = JSON.parse(body);
	// 		let album_items_length = search_result_json.albums.items.length;
	// 		let album_items = search_result_json.albums.items;

	// 		// asynchronously display the image 
	// 		for(let i = 0 ; i < album_items_length; i++){
	// 			display_image(res, album_items[i].images[0].url, album_items_length);
	// 		}
	// 	});
	// });