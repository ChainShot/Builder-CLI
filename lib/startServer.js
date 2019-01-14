const { exec } = require('child_process');
const path = require('path');
const chalk = require('chalk');
const opn = require('opn');
const ora = require('ora');
const spinner = ora(chalk.green('Starting Builder...'));
const { PORT } = require('./config');

function startServer(cwd) {
  spinner.start();
  return new Promise((resolve, reject) => {
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
    const child = exec(`${envVariables.join(' ')} npm start`, { cwd });

    child.stdout.on('data', (data) => {
      if(data.indexOf(`Builder server @ ${PORT}`) >= 0) {
        const url = `http://localhost:${PORT}/`;
        spinner.stopAndPersist({
          text: chalk.white("Builder Started"),
          symbol: chalk.green('✔')
        });
        console.log(chalk.white(`Running at ${chalk.yellow(url)}`));
        opn(url);
      }
    });

    let error = [];
    child.stderr.on('data', (data) => {
      spinner.stop();
      error.push(data);
    });

    child.on('exit', (code) => {
      spinner.stop();
      if(code !== 0) {
        reject(error.join('\n'));
        return;
      }
      resolve();
    });
  });
}

module.exports = startServer;
