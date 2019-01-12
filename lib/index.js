const checkExisting = require('./checkExisting');
const checkNewVersion = require('./checkNewVersion');
const clone = require('./clone');
const startServer = require('./startServer');
const writeServerEnv = require('./writeServerEnv');
const installServerDependencies = require('./installServerDependencies');
const installClientDependencies = require('./installClientDependencies');
const writeClientEnv = require('./writeClientEnv');
const startClient = require('./startClient');
const path = require('path');
const getPort = require('get-port');
const BUILDER_REPO = 'https://github.com/ChainShot/Builder.git';

module.exports = async () => {
  const BUILDER_DIR = path.join(__dirname, '..', 'builder');

  const existing = await checkExisting(BUILDER_DIR);

  let shouldUpdate = !existing;
  if(existing) {
    shouldUpdate = await checkNewVersion(BUILDER_DIR, BUILDER_REPO);
  }

  if(shouldUpdate) {
    await clone(BUILDER_REPO, BUILDER_DIR);
  }

  const serverPort = await getPort();
  const serverPath = path.join(BUILDER_DIR, 'server');
  await writeServerEnv(serverPath, serverPort);
  if(shouldUpdate) await installServerDependencies(serverPath);

  const clientPort = await getPort();
  const clientPath = path.join(BUILDER_DIR, 'client');
  await writeClientEnv(clientPath, serverPort);
  if(shouldUpdate) await installClientDependencies(clientPath);

  await startServer(serverPath, serverPort);
  await startClient(clientPath, clientPort);
};
