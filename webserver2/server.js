const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const port = 5000;
const hostname = "127.0.0.1";

// This tells browser what type of file is being sent
const mimeTypes = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    png: "image/png",
    jpeg: "image/jpeg",
    jpg: "image/jpg"
};

http.createServer((req, res) => {

    // Extract path from URL
    // Example:
    // localhost:5000/about.html
    // gives -> /about.html
    let myuri = url.parse(req.url).pathname;

    // Convert URL path to actual file path
    let filename = path.join(process.cwd(), unescape(myuri));

    console.log(`File you are looking for is: ${filename}`);

    let loadfile;

    try {
        loadfile = fs.lstatSync(filename);
    }
    catch (error) {

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 File Not Found");

        return;
    }

    // If requested item is a file
    if (loadfile.isFile()) {

        // Get extension
        let ext = path.extname(filename).split('.').reverse()[0];

        // Detect mime type
        let mimetype = mimeTypes[ext] || "text/plain";

        // Send response header
        res.writeHead(200, { 'Content-Type': mimetype });

        // Stream file efficiently
        let filestream = fs.createReadStream(filename);

        filestream.pipe(res);
    }

    // If requested item is a directory
    else if (loadfile.isDirectory()) {

        res.writeHead(302, {
            'Location': '/index.html'
        });

        res.end();
    }

    // Any other error
    else {

        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end("500 Internal Server Error");
    }

}).listen(port, hostname, () => {

    console.log(`Server is running at http://${hostname}:${port}`);

});