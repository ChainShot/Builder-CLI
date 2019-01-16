const spawn = require('cross-spawn');
const path = require('path');
const chalk = require('chalk');
const opn = require('opn');
const ora = require('ora');
const spinner = ora(chalk.green('Starting Builder...'));
const getPort = require('get-port');

function startServer(cwd) {
  spinner.start();
  return new Promise(async (resolve, reject) => {
    const conentCwd = process.cwd();
    const parts = conentCwd.split(path.sep);
    const contentRepoName = parts.pop();
    const contentPath = parts.join(path.sep);
    const port = await getPort();
    const env = {
      ...process.env,
      PORT: port,
      CLI: true,
      CONTENT_PATH: contentPath,
      CONTENT_REPO_NAME: contentRepoName,
    }
    const child = spawn('npm', ['start'], { cwd, env });

    child.stdout.on('data', (data) => {
      if(data.indexOf(`Builder server @ ${port}`) >= 0) {
        const url = `http://localhost:${port}/`;
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
