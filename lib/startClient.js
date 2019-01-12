const { exec } = require('child_process');
const chalk = require('chalk');

async function startClient(cwd, port) {
  console.log(chalk.white(`Running Client at ${chalk.yellow(`http://localhost:${port}/`)}!`));
  exec(`PORT=${port} npm start`, { cwd });
}

module.exports = startClient;
