const path = require('path');
const fs = require('fs-extra');

async function writeServerEnv(serverDir, port) {
  const conentCwd = process.cwd();
  const parts = conentCwd.split(path.sep);
  const contentRepoName = parts.pop();
  const contentPath = parts.join(path.sep);
  const contents = [
    `CONTENT_PATH=${contentPath}`,
    `PORT=${port}`,
    `CONTENT_REPO_NAME=${contentRepoName}`,
  ].join("\n");
  await fs.writeFile(path.join(serverDir, '.env'), contents);
}

module.exports = writeServerEnv;
