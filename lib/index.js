const clone = require('./clone');
const startServer = require('./startServer');
const startClient = require('./startClient');
const path = require('path');
const BUILDER_REPO = 'https://github.com/ChainShot/Builder.git';

module.exports = async () => {
  const dest = path.join(__dirname, 'builder');
  await clone(BUILDER_REPO, dest);
  const serverPath = path.join(__dirname, 'builder', 'server');
  startServer(serverPath);
  const clientPath = path.join(__dirname, 'builder', 'client');
  await startClient(clientPath);
};
