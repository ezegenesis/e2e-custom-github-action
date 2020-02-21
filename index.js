const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

try {
  const ENVIRONMENT = core.getInput('env');

  const GITHUB_USERNAME = core.getInput('github_username');
  const GITHUB_PASSWORD = core.getInput('github_password');

  const DEV_CLIENT_URL = core.getInput('dev_client_url');
  const DEV_BASE_URL = core.getInput('dev_base_url');
  const PROD_CLIENT_URL = core.getInput('prod_client_url');
  const PROD_BASE_URL = core.getInput('prod_base_url');

  const SLACK_CLIENT_ID = core.getInput('slack_client_id');
  const SLACK_CLIENT_SECRET	= core.getInput('slack_client_secret');
  const SLACK_VERIFICATION_TOKEN = core.getInput('slack_verification_token');
  const SLACK_AUTH_TOKEN = core.getInput('slack_auth_token');

  let cypress_config;

  if (ENVIRONMENT === 'development') {
    cypress_config = `{
      \"baseUrl\": \"${DEV_CLIENT_URL}\",
      \"video\": false,
      \"env\": {
        \"CLIENT_URL\": \"${DEV_CLIENT_URL}\",
        \"API_BASE_URL\": \"${DEV_BASE_URL}\"
      }
    }
    `
  }

  if (ENVIRONMENT === 'production') {
    cypress_config = `{
      \"baseUrl\": \"${PROD_CLIENT_URL}\",
      \"video\": false,
      \"env\": {
        \"CLIENT_URL\": \"${PROD_CLIENT_URL}\",
        \"API_BASE_URL\": \"${PROD_BASE_URL}\"
      }
    }
    `
  }


  exec.exec(`git clone -b mvp https://${GITHUB_USERNAME}:${GITHUB_PASSWORD}@github.com/ezegenesis/client-core.git`)
    .then(() => exec.exec(`yarn`))
    .then(() => exec.exec(`yarn start-bg-server`))
    .then(() => exec.exec(`echo ${cypress_config} > ./cypress.json`))
    .then(() => exec.exec(`cat ./cypress.json`))
    .then(() => exec.exec(`yarn e2e-tests`))
    .then(() => exec.exec(`pkill node`))
    .catch(e => core.setFailed(e));
    
} catch (error) {
  core.setFailed(error.message);
}
