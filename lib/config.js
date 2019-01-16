const GITHUB_API = process.env.GITHUB_API || 'https://api.github.com';
const GITHUB_BUILDER_REPO = process.env.GITHUB_BUILDER_REPO || `https://api.github.com/repos/ChainShot/Builder`;
const OAUTH = process.env.OAUTH;
const TEAM_EMAIL = process.env.TEAM_EMAIL || 'team@chainshot.com';

module.exports = {
  GITHUB_BUILDER_REPO,
  GITHUB_API,
  OAUTH,
  TEAM_EMAIL,
}
