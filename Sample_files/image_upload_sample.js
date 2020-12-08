var https = require('https');
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'api.imgur.com',
  'path': '/3/image',
  'headers': {
    'Authorization': 'Bearer 80810473b84f865cf5860f3aa628d0c4e4e0dd32'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"image\"\r\n\r\nR0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--";

req.setHeader('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');

req.write(postData);

req.end();
