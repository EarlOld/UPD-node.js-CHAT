const dgram = require('dgram');
const util = require('util');
const PORT = 3333;
const HOST = process.argv[2].replace(/\n|\n/g, '');

var server = dgram.createSocket('udp4');

server.on('listening', function() {
  var address = server.address();
  console.log('UDP Server listening on ' + address.address + ':' + address.port);
});

server.on('message', function(message, remote) {
  console.log('[' + remote.address + ']: '+ message);
});

server.bind(PORT, HOST);

function Command() {
  process.stdin.on('data', function(chunk) {
    const message = chunk.toString().replace(/\n|\n/g, '');
    const buffer  = Buffer.from(message);
    client.send(buffer, 0, buffer.length, PORT, HOST);
  });
}

var client = dgram.createSocket('udp4');

client.bind();

client.on('listening', function() {
  var buffer = Buffer.from('Сonnect');

  client.send(buffer, 0, buffer.length, PORT, HOST);
});

client.on('error', function(err) {
  console.log(err);
});

client.on('close', function() {
  var buffer = Buffer.from('disconnect');

  client.send(buffer, 0, buffer.length, PORT, HOST);
});

process.stdin.resume();
Command();
