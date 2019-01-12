const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const spinner = ora(chalk.green('Downloading Latest Builder Version...'));

async function clone(repo, dest) {
  spinner.start();
  if(fs.exists(dest)) await fs.remove(dest);
  return new Promise((resolve, reject) => {
    const cloneProcess = exec(`git clone ${repo} ${dest}`, (err) => {
      spinner.color = 'white';
      if(err) {
        spinner.fail();
        reject(err);
        return;
      }
      spinner.text = 'Latest Builder Version Downloaded'
      spinner.succeed();
      resolve();
    });

    cloneProcess.stdout.pipe(process.stdout);
  });
}

module.exports = clone;
