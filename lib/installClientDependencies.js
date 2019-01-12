const { exec } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');
const spinner = ora(chalk.green('Installing Client Dependencies...'));

async function installClientDependencies(cwd) {
  spinner.start();
  return new Promise((resolve, reject) => {
    const installChild = exec('npm i', { cwd });

    installChild.on('exit', (code, signal) => {
      spinner.stopAndPersist({
        text: chalk.white(`Client Dependencies Installed`),
        symbol: chalk.green('✔')
      });

      resolve();
    });
  });
}

module.exports = installClientDependencies;
