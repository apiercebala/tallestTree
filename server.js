var http = require("http");

http.createServer(function(request, response) {  
  response.writeHead(200, {"Content-Type": "text/plain"});  
  response.write("Hello from the Node.js server!");  
  response.end();
}).listen(8080);
console.log('Server is listening to http://localhost/ on port 8080…');