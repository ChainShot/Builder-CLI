const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const AdmZip = require('adm-zip');
const spinner = ora(chalk.green('Downloading Latest Builder Version...'));
const { GITHUB_BUILDER_REPO, OAUTH } = require('./config');

async function downloadLatest(currentVersion, builderDir) {
  const params = {};
  if(OAUTH) params['access_token'] = OAUTH;
  const { data: { tag_name, assets } } = await axios.get(`${GITHUB_BUILDER_REPO}/releases/latest`, { params });
  if(!currentVersion || (tag_name.trim() !== currentVersion.trim())) {
    spinner.start();
    try {
      const build = assets.find(x => x.name === "build.zip");
      const { browser_download_url } = build;
      const { data } = await axios.get(browser_download_url, { responseType: 'arraybuffer' });
      const zip = new AdmZip(data);
      zip.extractAllTo(builderDir);
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
}

module.exports = downloadLatest;
