const dgram = require('dgram');
const client = dgram.createSocket('udp4');

client.connect(41234, 'localhost', (err) => {
  client.on('message', (msg, rinfo) => {
    console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  });

  client.on('close', () => {
    process.exit();
  });

  process.stdin.on('data', data => client.send(data.toString().trim()));

  client.send('ping!', err => err && console.error(err));

});

