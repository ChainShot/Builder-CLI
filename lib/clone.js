const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function clone(repo) {
  const dest = path.join(__dirname, 'test');
  console.log(dest)
  const exists = await fs.pathExists(dest);
  if(exists) await fs.remove(dest);
  return new Promise((resolve, reject) => {
    exec(`git clone https://github.com/ChainShot/Builder.git ${dest}`, (err) => {
      if(err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = clone;
