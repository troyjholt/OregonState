var http = require('http');

http.createServer(function(req,res){
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world!');
}).listen(6329);

console.log('Server started on localhost:6329; press Ctrl-C to terminate....');
