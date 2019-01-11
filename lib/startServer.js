const { spawn } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const spinner = ora(chalk.green('Installing Server Dependencies...'));

async function startServer(cwd, port) {
  spinner.start();
  return new Promise((resolve, reject) => {
    const installChild = spawn('npm', ['i'], { cwd });

    installChild.on('exit', (code, signal) => {
      spinner.stopAndPersist({ text: chalk.white('Started Server'), symbol: chalk.green('✔') });

      spawn('npm', ['start'], { cwd });
      resolve();
    });
  });
}

module.exports = startServer;
