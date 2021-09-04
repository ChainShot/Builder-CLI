const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const AdmZip = require('adm-zip');
const spinner = ora(chalk.green('Downloading Latest Builder Version...'));
const { GITHUB_BUILDER_REPO, BUILD_ZIP } = require('./config');

async function downloadLatest(currentVersion, builderDir) {
  // we should only need to pull the latest two releases to find a build
  // assuming that releases have not been put out in rapid succession (< 5 minutes)
  const params = {
    per_page: 2
  };
  const { data } = await axios.get(`${GITHUB_BUILDER_REPO}/releases`, { params });
  // find the most recent release that has a build published
  // it can take ~ 5 minutes for a build to be published after the release
  const latestPublished = data
    .filter(x => x.assets.find(y => y.name === BUILD_ZIP))
    .sort((a,b) => a.published_at - b.published_at)[0];
  const { tag_name, assets } = latestPublished;
  if(!currentVersion || (tag_name.trim() !== currentVersion.trim())) {
    spinner.start();
    try {
      const build = assets.find(x => x.name === BUILD_ZIP);
      const { browser_download_url } = build;
      const { data } = await axios.get(browser_download_url, { responseType: 'arraybuffer' });
      const zip = new AdmZip(data);
      zip.extractAllTo(builderDir, true);
      spinner.stopAndPersist({
        text: chalk.white("Successfully Downloaded Latest Release"),
        symbol: chalk.green('✔')
      });
    }
    catch(ex) {
      spinner.stopAndPersist({
        text: chalk.red("Could not download Latest Release"),
        symbol: chalk.red('✘')
      });
      throw ex;
    }
  }
  else {
    spinner.stopAndPersist({
      text: chalk.white("Builder is up to date"),
      symbol: chalk.green('✔')
    });
  }
}

module.exports = downloadLatest;
