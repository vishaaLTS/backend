const http = require('http');
http.createServer((req,res) => {
    let route = req.url;
    if(route =="/home"){
        res.end("Home");
    }
     if(route =="/about"){
        res.end("About");
    }
     if(route =="/contact"){
        res.end("Contact");
    }
    else{
        res.end("Not found");
    }
}).listen(8000);