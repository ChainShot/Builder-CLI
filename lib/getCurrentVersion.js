const fs = require('fs-extra');
const path = require('path');

async function getCurrentVersion(builderDir) {
  const jsonPath = path.join(builderDir, 'build.json');
  const contents = await fs.readFile(jsonPath);
  const { version } = JSON.parse(contents.toString());
  return version;
}

module.exports = getCurrentVersion;
