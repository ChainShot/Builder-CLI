const path = require('path');
const fs = require('fs-extra');

async function writeClientEnv(clientDir, serverPort) {
  const conentCwd = process.cwd();
  const parts = conentCwd.split(path.sep);
  const contentRepoName = parts.pop();
  const contentPath = parts.join(path.sep);
  const contents = [
    `REACT_APP_API_URL=http://localhost:${serverPort}/`,
  ].join("\n");
  await fs.writeFile(path.join(clientDir, '.env'), contents);
}

module.exports = writeClientEnv;
