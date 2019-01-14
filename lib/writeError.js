const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const { TEAM_EMAIL } = require('./config');

async function writeError(ex) {
  const fileName = `error-${Date.now()}.txt`;
  const logsPath = path.join(__dirname, "..", "logs");
  await fs.ensureDir(logsPath);
  const filePath = path.join(logsPath, fileName);
  console.log(chalk.red('\nSomething went wrong running Builder.'));
  await fs.writeFile(filePath, ex);
  console.log(`An error log has been written to ${chalk.yellow(filePath)} for troubleshooting`);
  console.log(`Reach out to us at ${chalk.yellow(TEAM_EMAIL)} for help\n`);
  process.exit(1);
}

module.exports = writeError;
