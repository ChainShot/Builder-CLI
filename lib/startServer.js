const { exec } = require('child_process');
const path = require('path');
const chalk = require('chalk');
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
  console.log(chalk.white(`Running builder at ${chalk.yellow(`http://localhost:${PORT}/`)}`));
  exec(`${envVariables.join(' ')} npm start`, { cwd });
}

module.exports = startServer;
