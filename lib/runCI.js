const spawn = require('cross-spawn');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const oraConfig = ora(chalk.green('Running Tests...'));

function runCI(cwd) {
  const spinner = oraConfig.start();
  return new Promise(async (resolve, reject) => {
    const conentCwd = process.cwd();
    const parts = conentCwd.split(path.sep);
    const contentRepoName = parts.pop();
    const contentPath = parts.join(path.sep);
    const env = {
      ...process.env,
      CONTENT_PATH: contentPath,
      CONTENT_REPO_NAME: contentRepoName,
    }
    const child = spawn('node', ['testAll'], {
      cwd, env,
      stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    });

    let results = [];

    child.on('message', ({ type, data }) => {
      if(type === "RESULT") {
        results.push(data);
        const successes = results.filter(({ success }) => success);
        const allPassing = successes.length === results.length;
        const color = allPassing ? chalk.green : chalk.red;
        spinner.text = color(`${successes.length} of ${results.length} passing...`);
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
      const successes = results.filter(({ success }) => success);
      const allPassing = successes.length === results.length;
      if(allPassing) {
        console.log(chalk.green("All tests passed!"));
        resolve();
      }
      else {
        const failed = results
          .filter(({ success }) => !success)
        const msg = failed.map(({ version, stage }) => ` ${version}: ${stage} failed.`).join("\n");
        console.log(chalk.red(`${failed.length} Failed Stage(s):`));
        console.log(msg);
        process.exit(1);
      }
    });
  });
}

module.exports = runCI;
