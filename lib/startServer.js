const { spawn } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function writeEnvironmentVariables(serverCwd) {
    const conentCwd = process.cwd();
    const parts = conentCwd.split(path.sep);
    const contentRepoName = parts.pop();
    const contentPath = parts.join(path.sep);
    const contents = [
      `CONTENT_PATH=${contentPath}`,
      `CONTENT_REPO_NAME=${contentRepoName}`,
    ].join("\n");
    await fs.writeFile(path.join(serverCwd, '.env'), contents);
}

async function startServer(cwd) {
  await writeEnvironmentVariables(cwd);
  return new Promise((resolve, reject) => {
    const installChild = spawn('npm', ['i'], { cwd, stdio: 'inherit' });

    installChild.on('exit', (code, signal) => {
      const startChild = spawn('npm', ['start'], { cwd, stdio: 'inherit' });

      startChild.on('exit', () => {
        resolve();
      });
    });
  });
}

module.exports = startServer;
