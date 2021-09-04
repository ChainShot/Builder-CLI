const GITHUB_API = process.env.GITHUB_API || 'https://api.github.com';
const GITHUB_BUILDER_REPO = process.env.GITHUB_BUILDER_REPO || `https://api.github.com/repos/ChainShot/Builder`;
const TEAM_EMAIL = process.env.TEAM_EMAIL || 'team@chainshot.com';
const BUILD_ZIP = 'build.zip';

module.exports = {
  GITHUB_BUILDER_REPO,
  GITHUB_API,
  TEAM_EMAIL,
  BUILD_ZIP,
}
