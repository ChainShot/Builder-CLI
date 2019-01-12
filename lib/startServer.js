const { spawn } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const spinner = ora(chalk.green('Installing Server Dependencies...'));

async function startServer(cwd, port) {
  console.log(chalk.white('Running Server'));
  spawn('npm', ['start'], { cwd });
}

module.exports = startServer;
