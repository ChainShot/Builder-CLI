const GITHUB_API = process.env.GITHUB_API || 'https://api.github.com';
const GITHUB_BUILDER_REPO = process.env.GITHUB_BUILDER_REPO || `https://api.github.com/repos/ChainShot/Builder`;
const OAUTH = process.env.OAUTH;

module.exports = {
  GITHUB_BUILDER_REPO,
  GITHUB_API,
  OAUTH,
  PORT: 59449
}
