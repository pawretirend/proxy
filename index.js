const readline = require('readline');
const { exec } = require('child_process');
const https = require('https');
const fs = require('fs');
const net = require('net'); // Modul untuk koneksi TCP

// Fungsi untuk menambahkan ANSI escape code untuk warna
const colorize = (text, colorCode) => {
  return `\x1b[${colorCode}m${text}\x1b[0m`;
};

// Membuat interface pembacaan dan penulisan
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: colorize('root@userbanido718~# ', '33') // Mengatur prompt dengan warna kuning
});

// Menampilkan pesan selamat datang dan instruksi
console.log('Selamat datang di aplikasi CLI sederhana');
console.log('Ketik "help" untuk melihat daftar perintah.');

// Event listener untuk input dari pengguna
rl.on('line', (input) => {
  const command = input.trim();

  // Memproses perintah yang dimasukkan
  switch (command.split(' ')[0]) {
    case 'help':
      console.log('=== Bantuan ===');
      console.log('1. help: Menampilkan pesan bantuan');
      console.log('2. exit: Keluar dari aplikasi');
      console.log('3. pepek url tikme: Menjalankan file pepek.js dengan URL dan tikme sebagai argumen');
      console.log('4. getproxy: Menghapus file proxy.txt dan mengunduh versi terbaru dari https://proxy.vegeta.cloud/proxy.txt');
      console.log('5. rapid url time: Menjalankan file rapid.js dengan URL dan time sebagai argumen');
      console.log('6. paping ip port: Menjalankan file paping.js dengan IP dan port sebagai argumen');
      break;
    case 'exit':
      console.log('Terima kasih telah menggunakan aplikasi CLI sederhana.');
      rl.close();
      process.exit(0); // Keluar dari proses Node.js
      break;
    case 'pepek':
      handlePepekCommand(command);
      break;
    case 'getproxy':
      handleGetProxyCommand();
      break;
    case 'rapid':
      handleRapidCommand(command);
      break;
    case 'paping':
      handlePapingCommand(command);
      break;
    default:
      console.log(`Perintah '${command}' tidak dikenali. Ketik 'help' untuk bantuan.`);
      break;
  }

  // Menampilkan prompt lagi
  rl.prompt();
});

// Fungsi untuk menghandle command 'pepek'
function handlePepekCommand(command) {
  const args = command.split(' ').slice(1); // Memisahkan argumen setelah 'pepek'
  const url = args[0];
  const tikme = args[1];

  if (!url || !tikme) {
    console.log('Format perintah pepek salah. Gunakan: pepek url tikme');
    rl.prompt();
    return;
  }

  const commandToExecute = `node pepek.js ${url} ${tikme}`;
  exec(commandToExecute, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      rl.prompt();
      return;
    }
    if (stderr) {
      console.error(`Error dari pepek.js: ${stderr}`);
      rl.prompt();
      return;
    }

    // Mendapatkan tanggal, hari, dan bulan saat ini
    const now = new Date();
    const tanggal = now.getDate();
    const hari = now.toLocaleDateString('id-ID', { weekday: 'long' });
    const bulan = now.toLocaleDateString('id-ID', { month: 'long' });

    console.log(`Pepek berhasil dijalankan pada ${hari}, ${tanggal} ${bulan}`);
    console.log(`Output dari pepek.js: ${stdout}`);

    // Menampilkan prompt lagi setelah menampilkan hasil pepek
    rl.prompt();
  });
}

// Fungsi untuk menghandle command 'getproxy'
function handleGetProxyCommand() {
  // Memanggil command rm -rf proxy.txt untuk menghapus file proxy.txt
  exec('rm -rf proxy.txt', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      rl.prompt();
      return;
    }
    if (stderr) {
      console.error(`Error dari rm -rf proxy.txt: ${stderr}`);
      rl.prompt();
      return;
    }

    console.log('File proxy.txt berhasil dihapus.');

    // proxy.txt dari https://proxy.vegeta.cloud/proxy.txt
        const file = fs.createWriteStream('proxy.txt');
        const request = https.get('https://proxy.vegeta.cloud/proxy.txt', (response) => {
          response.pipe(file);
          file.on('finish', () => {
            file.close(() => {
              console.log('File proxy.txt berhasil diunduh dari https://proxy.vegeta.cloud/proxy.txt');
              console.log('Proxy telah diperbarui.');
              rl.prompt();
            });
          });
        });

        request.on('error', (err) => {
          console.error(`Error saat mengunduh file: ${err.message}`);
          rl.prompt();
        });
      });
    }

    // Fungsi untuk menghandle command 'rapid'
    function handleRapidCommand(command) {
      const args = command.split(' ').slice(1); // Memisahkan argumen setelah 'rapid'
      const url = args[0];
      const time = args[1];

      if (!url || !time) {
        console.log('Format perintah rapid salah. Gunakan: rapid url time');
        rl.prompt();
        return;
      }

      const commandToExecute = `node rapid.js x-requested-with ${time} 39 proxy.txt 9 ${url}`;
      exec(commandToExecute, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          rl.prompt();
          return;
        }
        if (stderr) {
          console.error(`Error dari rapid.js: ${stderr}`);
          rl.prompt();
          return;
        }

        console.log(`File rapid.js berhasil dijalankan dengan URL: ${url} dan Time: ${time}`);
        console.log(`Output dari rapid.js: ${stdout}`);
        rl.prompt();
      });
    }

    // Fungsi untuk menghandle command 'paping'
    function handlePapingCommand(command) {
      const args = command.split(' ').slice(1); // Memisahkan argumen setelah 'paping'
      const ip = args[0];
      const port = parseInt(args[1]);

      if (!ip || !port) {
        console.log('Format perintah paping salah. Gunakan: paping ip port');
        rl.prompt();
        return;
      }

      const commandToExecute = `node paping.js ${ip} ${port}`;
      const timeout = 10000; // Timeout setelah 10 detik

      const childProcess = exec(commandToExecute);

      // Menangkap output dari child process (paping.js)
      childProcess.stdout.on('data', (data) => {
        console.log(`Output dari paping.js: ${data}`);
      });

      childProcess.stderr.on('data', (data) => {
        console.error(`Error dari paping.js: ${data}`);
      });

      childProcess.on('close', (code) => {
        console.log(`paping.js selesai dengan kode: ${code}`);

        // Setelah 10 detik, tampilkan prompt kembali
        setTimeout(() => {
          rl.prompt();
        }, timeout);
      });
    }

    // Menampilkan prompt pertama kali
    rl.prompt();
