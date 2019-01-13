require('dotenv').config();
const checkExisting = require('./checkExisting');
const getCurrentVersion = require('./getCurrentVersion');
const downloadLatest = require('./downloadLatest');
const startServer = require('./startServer');
const path = require('path');

module.exports = async () => {
  const BUILDER_DIR = path.join(__dirname, '..', 'builder');

  const existing = await checkExisting(BUILDER_DIR);

  if(existing) {
    const currentVersion = await getCurrentVersion(BUILDER_DIR);
    try {
      await downloadLatest(currentVersion, BUILDER_DIR);
    }
    catch(ex) {
      // latest build failed, that's okay run with the latest version
    }
  }
  else {
    await downloadLatest(null, BUILDER_DIR);
  }

  const serverPath = path.join(BUILDER_DIR, 'server');
  await startServer(serverPath);
};
