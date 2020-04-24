const dgram = require('dgram');
const util = require('util');
const PORT = 3333;
const HOST = process.argv[2].replace(/\n|\n/g, '');

const server = dgram.createSocket('udp4');

server.on('listening', () => {
  const address = server.address();
  console.log('UDP Server listening on ' + address.address + ':' + address.port);
});

server.on('message', (message, remote) => {
  console.log('[' + remote.address + ']: '+ message);
});

server.bind(PORT);

function Command() {
  process.stdin.on('data', (chunk) => {
    const message = chunk.toString().replace(/\n|\n/g, '');
    const buffer  = Buffer.from(message);
    client.send(buffer, 0, buffer.length, PORT, HOST);
  });
}

const client = dgram.createSocket('udp4');

client.bind();

client.on('listening', () => {
  const buffer = Buffer.from('Сonnect');

  client.send(buffer, 0, buffer.length, PORT, HOST);
});

client.on('error', (err) => {
  console.log(err);
});

client.on('close', () => {
  const buffer = Buffer.from('disconnect');

  client.send(buffer, 0, buffer.length, PORT, HOST);
});

process.stdin.resume();
Command();
