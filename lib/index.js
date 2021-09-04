require('dotenv').config();
const checkExisting = require('./checkExisting');
const getCurrentVersion = require('./getCurrentVersion');
const downloadLatest = require('./downloadLatest');
const startServer = require('./startServer');
const path = require('path');
const fs = require('fs-extra');
const writeError = require('./writeError');
const runCI = require("./runCI");
const ARGS = ['init', 'run', 'ci'];

module.exports = async () => {
  const arg = process.argv.slice(2)[0];
  if(ARGS.indexOf(arg) < 0) {
    const usage = (await fs.readFile(path.join(__dirname, 'usage.txt'))).toString();
    console.log(usage);
    return;
  }
  if(arg === 'init') {
    // this will get passed onto the server
    process.env.CONTENT_INIT = true;
  }

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

  try {
    if(arg === "ci") {
      const ciPath = path.join(BUILDER_DIR, 'ci');
      const success = await runCI(ciPath);
      process.exit(success ? 1 : 0);
    }
    else {
      const serverPath = path.join(BUILDER_DIR, 'server');
      await startServer(serverPath);
    }
  }
  catch(ex) {
    await writeError(ex);
  }
};
