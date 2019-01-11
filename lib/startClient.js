const { exec } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');
const spinner = ora(chalk.green('Installing Client Dependencies...'));

async function startClient(cwd, port) {
  spinner.start();
  return new Promise((resolve, reject) => {
    const installChild = exec('npm i', { cwd });

    installChild.on('exit', (code, signal) => {
      spinner.color = 'white';
      spinner.text = `Running client on at ${chalk.yellow(`http://localhost:${port}/`)}!`;
      spinner.stopAndPersist();

      exec(`PORT=${port} npm start`, { cwd });
      resolve();
    });
  });
}

module.exports = startClient;
