var http = require('http');
var assert = require('assert');

var restc = require('./index');

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

var client = restc({ port: 1337 });

server.listen(1337, '127.0.0.1', function () {
  console.log('Server running at http://127.0.0.1:1337');

  client.get('/', function (err, req, res) {
    if (err) throw err;
    console.log(res.body);
    assert(res.body == 'Hello World');
    process.exit();
  });

});

