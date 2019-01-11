const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const axios = require('axios');
const spinner = ora(chalk.green('Checking Builder Version...'));

async function checkNewVersion(builderDir, repo) {
  return new Promise((resolve, reject) => {
    spinner.start();
    exec('git tag', { cwd: builderDir }, async (err, localTag, stderr) => {
      const parts = repo.split("/");
      const name = parts.pop().slice(0, -4);
      const owner = parts.pop();
      const { data } = await axios.get(`https://api.github.com/repos/${owner}/${name}/tags`);
      const tag = data[0];
      const newVersion = (tag.name.trim() !== localTag.trim());
      if(newVersion) {
        spinner.stopAndPersist({ text: chalk.white('New Version Found'), symbol: chalk.green('✔') });
      }
      else {
        spinner.stopAndPersist({ text: chalk.white('Version up to Date'), symbol: chalk.green('✔') });
      }
      resolve(newVersion);
    });
  });
}

module.exports = checkNewVersion;
