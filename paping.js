const net = require('net');

function tcpPing(targetIp, targetPort, interval = 500) {
  setInterval(() => {
    const client = new net.Socket();
    const start = new Date().getTime();

    client.connect(targetPort, targetIp, () => {
      const end = new Date().getTime();
      const responseTime = end - start;

      console.log(`\x1b[97mConnected to \x1b[92m${targetIp}\x1b[97m: \x1b[97mtime=\x1b[92m${responseTime}ms \x1b[97mprotocol=\x1b[92mTCP \x1b[97mport=\x1b[92m${targetPort}`);

      client.end();
    });

    client.on('error', (err) => {
      console.log('\x1b[91mConnection timed out');
    });
  }, interval);
}

// Memeriksa jumlah argumen yang diberikan saat menjalankan script
if (process.argv.length !== 4) {
  console.log('Usage: node paping.js ip port');
  process.exit(1);
}

const targetIp = process.argv[2];
const targetPort = parseInt(process.argv[3]);
const interval = 400; // dalam milidetik (400 ms = 0.4 detik)

tcpPing(targetIp, targetPort, interval);
