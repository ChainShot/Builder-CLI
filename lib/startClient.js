const { spawn } = require('child_process');

async function startClient(cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['i'], { cwd, stdio: 'inherit' });

    child.on('exit', (code, signal) => {
      spawn('npm', ['start'], { cwd, stdio: 'inherit' });
    });
  });
}

module.exports = startClient;
