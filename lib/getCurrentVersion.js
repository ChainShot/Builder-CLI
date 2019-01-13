const fs = require('fs-extra');
const path = require('path');

async function getCurrentVersion(builderDir) {
  const jsonPath = path.join(builderDir, 'build.json');
  const { version } = await fs.readFile(jsonPath);
  return version;
}

module.exports = getCurrentVersion;
