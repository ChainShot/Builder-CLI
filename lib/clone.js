const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function clone(repo, dest) {
  const exists = await fs.pathExists(dest);
  if(exists) await fs.remove(dest);
  return new Promise((resolve, reject) => {
    const cloneProcess = exec(`git clone ${repo} ${dest}`, (err) => {
      if(err) {
        reject(err);
        return;
      }
      resolve();
    });

    cloneProcess.stdout.pipe(process.stdout);
  });
}

module.exports = clone;
