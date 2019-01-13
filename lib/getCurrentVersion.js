const { exec } = require('child_process');

async function getCurrentVersion(builderDir) {
  return new Promise((resolve, reject) => {
    exec('git tag', { cwd: builderDir }, async (err, tags) => {
      if(err) {
        reject(err);
        return;
      }
      const latestTag = tags.split("\n").pop();
      resolve(latestTag);
    });
  });
}

module.exports = getCurrentVersion;
