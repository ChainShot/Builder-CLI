const { exec } = require('child_process');
const path = require('path');
const chalk = require('chalk');
const opn = require('opn');
const { PORT } = require('./config');

async function startServer(cwd) {
  const conentCwd = process.cwd();
  const parts = conentCwd.split(path.sep);
  const contentRepoName = parts.pop();
  const contentPath = parts.join(path.sep);
  const envVariables = [
    'CLI=true',
    `CONTENT_PATH=${contentPath}`,
    `PORT=${PORT}`,
    `CONTENT_REPO_NAME=${contentRepoName}`,
  ]
  exec(`${envVariables.join(' ')} npm start`, { cwd });
  const url = `http://localhost:${PORT}/`;
  console.log(chalk.white(`Running at ${chalk.yellow(url)}`));
  opn(url);
}

module.exports = startServer;
